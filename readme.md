# Aura TodoMVC Example

> Aura is a UI framework for developing dynamic web apps for mobile and desktop devices. Aura provides a scalable long-lived lifecycle to support building apps engineered for growth. Aura supports partitioned multi-tier component development that bridges the client and server. It uses JavaScript on the client side and Java on the server side.

> _[Aura - auraframework.org](http://documentation.auraframework.org/auradocs#)_


## Learning Aura

The [Aura docs website](http://documentation.auraframework.org/auradocs#) is a great resource for getting started.


## Running

[Java](http://www.java.com) and [Maven](http://maven.apache.org/) are required to run this app.

To install and build the server:

        # from labs/architecture-examples/aura
        mvn clean install

To run the demo server:

        # from labs/architecture-examples/aura
        mvn jetty:run

To access the TodoMVC app, open a browser and navigate to:

[http://localhost:8080](http://localhost:8080) (redirects to [http://localhost:8080/todomvc/todoapp.app](http://localhost:8080/todomvc/todoapp.app))
