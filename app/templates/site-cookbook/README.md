app Cookbook
============
Default site cookbook to get you started.

Usage
-----
#### app::default

Just include `app` in your node's `run_list`:

```json
{
  "name":"my_node",
  "run_list": [
    "recipe[app]"
  ]
}
```