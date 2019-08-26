#!/usr/bin/env bash
tag_query='query {
  repository(owner:\"modyo\", name:\"modyo-sdk\") {
    refs(last: 1, orderBy: {direction: ASC, field: TAG_COMMIT_DATE}, refPrefix: \"refs/tags/\") {
      nodes {
        name
      }
    }
  }
}'

tag_query_encoded="$(echo $tag_query)"

json_response=$(curl -H 'Content-Type: application/json' \
   -H "Authorization: bearer $GITHUB_TOKEN" \
   -X POST -d "{ \"query\": \"$tag_query_encoded\"}" https://api.github.com/graphql)

tag_version=$(echo $json_response | python -c "import sys,json; print(json.load(sys.stdin)['data']['repository']['refs']['nodes'][0]['name'])")

echo $tag_version
