# Web Development Proxy

for when you need to run multiple node http instances and another web server (apache, nginx).

## How to Install
clone the repository, `cd` into the directory and run `npm install`
on Windows you can run `npm script install-windows-service` to have dev_proxy run in the background and at startup

## How to Configure
dev_proxy runs off of your hosts file (should work on Win/Mac/Linux, but only tested on Windows).  simply add `:PORT` as a comment after each domain.  

## Example Steps
 - Add `127.0.0.1    test.local #:7001` to your host file
 - Create a simple node http server listening on port 7001
 - visit http://test.local in your browser, no need to specify/remember port numbers


