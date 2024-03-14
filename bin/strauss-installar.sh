#!/bin/bash

# Function to get the latest release version from GitHub API
get_latest_release() {
    curl --silent "https://api.github.com/repos/BrianHenryIE/strauss/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/'
}

# Function to check if the .phar file or .txt file does not exist, or if the latest release version is not installed
is_update_needed() {
    local latest_release=$1
    [[ ! -f ./bin/strauss.phar || ! -f ./bin/strauss-version.txt || $(cat ./bin/strauss-version.txt) != "$latest_release" ]]
}

# Function to download and install the latest release
download_and_install() {
    local latest_release=$1
    curl -o bin/strauss.phar -L -C - https://github.com/BrianHenryIE/strauss/releases/download/"$latest_release"/strauss.phar
    echo "$latest_release" > ./bin/strauss-version.txt
}

# Main script execution
main() {
    local latest_release
    latest_release=$(get_latest_release)
    if is_update_needed "$latest_release"; then
        download_and_install "$latest_release"
    fi
}

main
