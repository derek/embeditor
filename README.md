
Embeditor
=========

About
-----

Embeditor is a super easy way to embed a fancy text/code editor onto any webpage.

Including it is as easy as:

            
    <iframe src="http://embeditor.org/"></iframe>
        

That's it! To make it bigger/smaller, use CSS to resize. The editor will take up 100% height/width of the iframe.

For example:


    <iframe id="embeditor" src="http://embeditor.org/"></iframe>
    <style>
        #embeditor{
            height:500px;
            width:300px;
            overflow: hidden;
            border:none;
        }
    </style>
        

Demos
-----

* [Simple](examples/simple.html)
* [API](examples/api.html)
* [API - Communicating between multiple editors](examples/multiple.html)
* [API - Evaluating Javascript](examples/eval.html)
* [API - Using as an HTML editor](examples/render.html)
* [API - Using as a Markdown editor](examples/markdown.html)

API
---
    Language modes - Embeditor defaults to plain text, but also supports HTML, CSS, and JS. More on the way. To activate, simply append ?mode=javascript, ?mode=html, or ?mode=css to the URL.

    For example...


        <iframe src="http://embeditor.org/?mode=javascript"></iframe>
                        

    And now you get all the benefits of the editor knowing it is dealing with JavaScript, so you get syntax-highlighting, auto-formatting, etc...

    "But this is in an iFrame, which restricts me from accessing the editor. So what good is a text editor if you can't either set the content or retrieve it?" Oh, but you can. Thanks postMessage.

        <iframe src="http://embeditor.org/"></iframe>
        <script src="http://embeditor.org/api.js"></script>
        <script>
            var editor = new Embeditor("embeditor");

            // Set the onReady() callback that will be fired when the editor is ready
            editor.onReady(function(){
                editor.setValue("Editor is ready");
            });

            // Get the content of the editor and log it to the console
            $("#btnGetValue").on("click", function(){
                editor.getValue(function(value){
                   console.log("Editor says ----> " + value);
                });
            });
        </script>
                        

    Eventually Embeditor will support more of the Ace editor API. Getting, setting, and modes are the most important, so that's what I started with.

Additional Notes
----------------

This is an open-source project. Please feel free to fork it and submit pull-requests.

Hacked together one lazy Sunday by [@derek](http://twitter.com/derek)

Special thanks to [@fjakobs](http://twitter.com/fjakobs) for the awesomely awesome Ace editor, which Embeditor uses.

[Fork me on GitHub](http://github.com/derek/embeditor)