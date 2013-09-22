Active Menu
=========

About
---------

Active Menu is a module for NodeJS that facilitates the creation of menus in Node applications, specifically (but not limited to) Express.

Inspired by the CMenu widget for the PHP framework Yii ([viewable here](http://www.yiiframework.com/doc/api/1.1/CMenu)) as well as the menu markup from Magento's top menu system.

The menu, when rendered will apply the proper `active` classes depending on the current route of the application. For example, when the user is on the route `/admin/posts`, the `<a>` tag and all parents of that tag (`<ul>` and `<li>`) will also be given the `active` class. This makes applying CSS for menu items which relate to the current route quite simple.

Example
------------

A simple example using Active Menu for a blog's admin panel:

    // Require Active Menu
    var activeMenu = require('active-menu');
    // Create a New Instance
    var adminMenu = new activeMenu('adminMenu');
    // Set HTML Attributes for the Top <ul> element
    adminMenu.setAttributes({class : 'menu', id : 'admin-menu'});

    // Home Node
    var homeNode = adminMenu.addMenuNode('Home', '/admin');
    homeNode.setAttributes({class : 'home home-icon', id : 'home-link'});

    // Posts Node and Children
    var postsNode = adminMenu.addMenuNode('Posts', '/admin/posts');
    postsNode.setAttributes({class : 'posts posts-icon'});

    var newPostNode = postsNode.addMenuNode('New Post', '/admin/posts/new');
    newPostNode.setAttributes({class : 'new-post new-icon'});

    // Settings Node
    var settingsNode = adminMenu.addMenuNode('Settings', '/admin/settings');
    settingsNode.setAttributes({class : 'settings cog-icon'});

    // Use Menu
    app.use(adminMenu.menu);

When `app.use(...)` is called for `adminMenu.menu`, it adds the menu instance to `res.locals` which is then accessible through the Jade templating engine. Simple put `!=adminMenu` in your template and it will render the menu as part of the HTML.

You can also get the HTML for the menu by calling `adminMenu.toString()`.

Result
---------

The above example would produce the following output:

    <ul class="menu" id="admin-menu">
        <li class="home home-icon level-0 first" id="home-link">
            <a href="/admin">Home</a>
        </li>
        <li class="posts posts-icon level-0 parent">
            <a href="/admin/posts">Posts</a>
            <ul class="level-1">
                <li class="new-post new-icon level-1 only">
                    <a href="/admin/posts/new">New Post</a>
                </li>
            </ul>
        </li>
        <li class="settings cog-icon level-0 last">
            <a href="/admin/settings">Settings</a>
        </li>
    </ul>