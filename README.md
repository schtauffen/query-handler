# Query-Handler.js

Query-Handler.js uses UMD. CommonJS, AMD, w/e.

## Example usage:

    let QueryHandler = require('query-handler');
    let q = QueryHandler("?a=1&b");

    q.has("a"); // -> true
    q.has("b"); // -> true
    q.has("c"); // -> false
    
    q.get("a"); // -> 1
    q.get("c", "not found!"); // -> "not found!"
    
    q.string; // -> "?a=1&b"

    q.remove("b"); 
    q.string; // -> "?a=1"
    
    q.set("c", true);
    q.string; // -> "?a=1&c=true"
