/**
 * Menu Node Class Requirement
 *
 * @type {ActiveMenuNode}
 */
var ActiveMenuNode = require('./active-menu-node');

/**
 * Menu Instance Reference For This Menu (that = this)
 * @type {module}
 */
var menuInstance = null;

/**
 * Main Menu Class
 *
 * @param menuName
 * @constructor
 */
var ActiveMenu = module.exports = function(menuName) {

    // Assign Instance Reference
    menuInstance = this;

    // Menu Name
    this.menuName = menuName;

    /**
     * List of Child Nodes
     * @type {ActiveMenuNode[]}
     */
    this.nodeList = [];

    /**
     * HTML Attributes Array
     * @type {Array}
     */
    this.htmlAttributes = [];

    /**
     * Current Request
     * @type {request}
     */
    this.currentRequest = null;

    /**
     * Depth
     * @type {int}
     */
    this.depth = 0;

    /**
     * HTML Sourcery Generator
     */
    this.generator = require('html-sourcery');
};


/**
 * Middleware Function
 * @param req
 * @param res
 * @param next
 */
ActiveMenu.prototype.menu = function(req, res, next) {
    // Assign Request
    menuInstance.currentRequest = req;
    // Assign To Local
    res.locals[menuInstance.menuName] = menuInstance;
    // Next
    next();
};

/**
 * Get Current Request Route Path
 * @returns {String}
 */
ActiveMenu.prototype.getCurrentRequestRoute = function() {
    return this.currentRequest.route.path;
};

/**
 * Set HTML Attributes
 *
 * @param attributes
 * @returns {exports}
 */
ActiveMenu.prototype.setAttributes = function(attributes) {
    this.htmlAttributes = attributes;
    return this;
};

/**
 * Add a New Menu Node
 *
 * @param text
 * @param route
 * @returns {ActiveMenuNode}
 */
ActiveMenu.prototype.addMenuNode = function(text, route) {
    // New Node
    var newNode = new ActiveMenuNode(menuInstance, this);
    // Assign Variables
    newNode.text = text;
    newNode.route = route;
    newNode.elementType = 'li';
    // Add to List
    this.nodeList.push(newNode);
    // Return
    return newNode;
};

/**
 * Render Menu to String
 * Can be called separately or with something like Jade by calling the menuname
 *
 * @returns {String}
 */
ActiveMenu.prototype.toString = function() {

    // Init Child Html
    var childHtml = [];

    // Node List for Reference Below
    var nodeList = this.nodeList;

    // Generate Children HTML Recursively
    this.nodeList.forEach(function(childNode, key) {
        // Handle First and Last
        if (key == 0) {
            childNode.isFirst = true;
        }
        if (key == (nodeList.length - 1)) {
            childNode.isLast = true;
        }
        // Append
        childHtml.push(childNode.toHtml());
    });

    // Wrap in Menu HTML, Compile and Return
    return this.generator.ul(
        this.htmlAttributes,
        childHtml
    ).compile();
};