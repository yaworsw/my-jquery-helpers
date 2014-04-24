# My jQuery Helpers

A collection of jQuery utilities I've found useful.

## $.helpers.addDefaultToRegistry

Given a registry class or instance make it respond with whatever is registered as `default` when `get` is called with no arguments.

## $.helpers.AsyncFactoryRegistry

A factory registry that always returns a promise which resolves when the factory completes.  Whether the actual factory method is async or not does not matter.

## $.helpers.eventize

A decorator which makes a given object be able to trigger events.

## $.helpers.FactoryRegistry

A registry with a method `factory` which will call the registered factory for that given spec.

### Spec

A spec is an object with a `type` key.

    {
      "type": "shirt",
      "properties": {
        "color": "red",
        "cost":  "10.00",
        "size":  "sm"
      }
    }

When specs are handed to a factory they are used to instantiate an object based upon the factory registered for it's type.

## $.helpers.Registry

A simple key value store.

## $.helpers.slice

Shorthand for Array.prototype.slice.call
