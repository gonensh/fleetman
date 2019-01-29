#!/bin/bash
killExpressServer()
{
	EXPRESS_SERVER_PID=$(pgrep -f "node src/server/server.js")
	if [ "$EXPRESS_SERVER_PID" ]; then
		echo "Killing Express server with PID $EXPRESS_SERVER_PID"
		kill $EXPRESS_SERVER_PID
	fi
}
runExpressServer()
{
	killExpressServer
	node src/server/server.js | tee logs/latest-run/server.log &
}
runAngularDevServer()
{
	runExpressServer
	ng serve | tee logs/latest-run/app.log
	killExpressServer
}
runAngularProdServer()
{
	runExpressServer
	ng serve --prod=true | tee logs/latest-run/app.log
	killExpressServer
}
runE2E()
{
	runExpressServer
	ng e2e | tee logs/latest-run/app.log
	killExpressServer
}

case $1 in
"e2e")
  runE2E
  ;;
"prod")
  runAngularProdServer
  ;;
"dev")
  runAngularDevServer
  ;;
*)
  runAngularDevServer
  ;;
esac

