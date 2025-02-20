#!/bin/bash

set -e

ECHO_PATH="/opt/echo"
ECHO_URL="https://github.com/SE-FIA-Socialmedia-RPG/Echo.git"

if [[ "$(id -u)" -ne 0 ]]; then
    echo "Error: This script must be run as root!" >&2
    exit 1
fi

if ! (grep -qs 'ID=debian' /etc/os-release && systemctl > /dev/null 2>&1); then
  echo "Error: Not on a Debian system with systemd" >&2
  exit 1
fi

for cmd in git node npm; do
  if ! command -v $cmd &> /dev/null; then
    echo "Error: $cmd is not installed." >&2
    exit 1
  fi
done

if systemctl is-active --quiet "echo.service"; then
    systemctl stop "echo.service"
fi

if [[ -d "${ECHO_PATH}" ]]; then
    rm -rf "${ECHO_PATH}"
fi

mkdir -p "${ECHO_PATH}"
git clone "${ECHO_URL}" "${ECHO_PATH}"


(cd "${ECHO_PATH}"
npm install
npx prisma migrate dev --name dev
npm run build
)

cp "${ECHO_PATH}/conf/env" "${ECHO_PATH}/.output/server/.env"
cp "${ECHO_PATH}/conf/env" "${ECHO_PATH}/.env"
cp "${ECHO_PATH}/conf/echo.service" "/etc/systemd/system/echo.service"
cp "${ECHO_PATH}/conf/nginx.conf" "/etc/nginx/nginx.conf"


chown -R www-data:www-data "${ECHO_PATH}"

systemctl daemon-reload
systemctl enable "echo.service"
systemctl enable "nginx.service"
systemctl restart "echo.service"
systemctl restart "nginx.service"
