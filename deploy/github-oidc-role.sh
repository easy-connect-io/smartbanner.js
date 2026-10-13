#!/usr/bin/env bash
# One-time setup for .github/workflows/deploy.yml: creates (or updates) the prod1 IAM role
# that GitHub Actions assumes via OIDC to upload the banner to code.easy-connect.io.
# Needs IAM admin in prod1 (842001031685), which already has the GitHub OIDC provider:
#
#   AWS_PROFILE=<your prod1 profile> ./deploy/github-oidc-role.sh
set -euo pipefail

ACCOUNT_ID=842001031685
ROLE_NAME=smartbanner-github-deploy

if [ "$(aws sts get-caller-identity --query Account --output text)" != "$ACCOUNT_ID" ]; then
  echo "AWS_PROFILE must point at prod1 ($ACCOUNT_ID)" >&2
  exit 1
fi

# Only workflow runs on main may assume the role, so a branch or PR can't deploy. The repo
# uses GitHub's immutable subject (owner and repo IDs, not names), as reported by
# `gh api repos/easy-connect-io/smartbanner.js/actions/oidc/customization/sub`.
TRUST=$(cat <<JSON
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Federated": "arn:aws:iam::${ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"},
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {"StringEquals": {
      "token.actions.githubusercontent.com:sub": "repo:easy-connect-io@263878661/smartbanner.js@1415924734:ref:refs/heads/main",
      "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
    }}
  }]
}
JSON
)

# The workflow uploads with `aws s3 cp`, which needs PutObject and nothing else.
PERMS=$(cat <<'JSON'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:PutObject",
    "Resource": "arn:aws:s3:::code.easy-connect.io/smartbanner/*"
  }]
}
JSON
)

if aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
  aws iam update-assume-role-policy --role-name "$ROLE_NAME" --policy-document "$TRUST"
  echo "updated the trust policy of $ROLE_NAME"
else
  aws iam create-role --role-name "$ROLE_NAME" \
    --description "GitHub Actions deploy of easy-connect-io/smartbanner.js to code.easy-connect.io/smartbanner/" \
    --assume-role-policy-document "$TRUST" >/dev/null
  echo "created $ROLE_NAME"
fi

aws iam put-role-policy --role-name "$ROLE_NAME" --policy-name smartbanner-deploy --policy-document "$PERMS"
echo "attached the inline policy smartbanner-deploy"
