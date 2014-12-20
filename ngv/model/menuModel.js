///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// class definitions for the navigation menu model, that is shared across several elements in the page.
//
// The following model classes are included: Menu, TopLevelEntry, SubMenu, MenuEntry.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// AbstractMenuEntry class

function AbstractMenuEntry(description, subEntries) {
    this.description = description;
    this.subEntries = subEntries;
}

// recursively extract all routable entries (containing href and template, so they affect the router )
AbstractMenuEntry.prototype.findRoutableMenuEntries = function () {

    var routableEntries = [];

    _.each(this.subEntries, function (topEntry) {
        _.each(topEntry.subEntries, function (collapsibleEntry) {
            _.each(collapsibleEntry.subEntries, function (leafEntry) {
                if (leafEntry.href && leafEntry.templateUrl) {
                    var routeConfig = {
                        href: leafEntry.href,
                        templateUrl: leafEntry.templateUrl
                    };
                    if (leafEntry.controller) {
                        routeConfig.controller = leafEntry.controller;
                    }
                    routableEntries.push(routeConfig);
                }
            });
        });
    });

    return routableEntries;
};

AbstractMenuEntry.prototype.addSubEntry = function (subEntry) {
    this.subEntries.push(subEntry);
}

AbstractMenuEntry.prototype.hasSubEntries = function () {
    return this.subEntries && this.subEntries.length > 0;
}


AbstractMenuEntry.prototype.selectEntry = function (index) {
    if (this.hasSubEntries()) {
        _.each(this.subEntries, function (entry) {
            entry.selected = false;
        });
        this.subEntries[index].selected = true;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Menu class

function Menu(subEntries, defaultHref, menuLength, resizable) {
    this.subEntries = subEntries;
    this.defaultHref = defaultHref;
    this.menuLength = menuLength;
    this.resizable = resizable;
}

Menu.prototype = new AbstractMenuEntry();

Menu.prototype.getTopMenuEntries = function () {
    return this.subEntries;
}

Menu.prototype.reset = function () {
    _.each(this.subEntries, function (topEntry) {
        _.each(topEntry.subEntries, function (collapsibleEntry) {
            _.each(collapsibleEntry.subEntries, function (leafEntry) {
                leafEntry.selected = false;
            });
            collapsibleEntry.selected = false;
        });
        topEntry.selected = false;
    });
}

Menu.prototype.selectTopMenuEntry = function (index) {

    this.reset();

    var selectedTopEntry = this.subEntries[index];

    // select the top entry
    selectedTopEntry.selected = true;

    // mark the first leaf entry as selected
    var firstCollapsible = selectedTopEntry.subEntries[0];

    if (firstCollapsible) {
        firstCollapsible.selectEntry(0);
    }
};

Menu.prototype.clearLeftMenuSelection = function () {
    var activeTopEntry = _.filter(this.subEntries, function (entry) {
        return entry.selected;
    })[0];

    if (activeTopEntry) {
        _.each(activeTopEntry.subEntries, function (collapsible) {
            _.each(collapsible.subEntries, function (leaf) {
                leaf.selected = false;
            });
        });
    }
};

Menu.prototype.getLeftMenuSections = function () {
    var selectedTopEntry = _.filter(this.subEntries, function (topEntry) {
        return topEntry.selected;
    })[0];

    if (selectedTopEntry) {
        return selectedTopEntry.subEntries;
    }
    else {
        return this.subEntries[0].subEntries;
    }
};

Menu.prototype.getLength = function () {
    return this.menuLength;
};

Menu.prototype.selectMenuWithHref = function (href) {
    this.reset();
    _.each(this.subEntries, function (topEntry) {
        _.each(topEntry.subEntries, function (collapsibleEntry) {
            _.each(collapsibleEntry.subEntries, function (leafEntry) {
                if (leafEntry.href === href) {
                    leafEntry.selected = true;
                    topEntry.selected = true;
                }
            });
        });
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// CollapsibleMenuEntry class

function CollapsibleMenuEntry(description, subEntries, collapsed) {
    AbstractMenuEntry.call(this, description, subEntries);
    this.collapsed = collapsed || false;
}

CollapsibleMenuEntry.prototype = new AbstractMenuEntry();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// SelectableMenuEntry class

function SelectableMenuEntry(description, href, subEntries, templateUrl, controller) {
    AbstractMenuEntry.call(this, description, subEntries);
    this.href = href;
    this.templateUrl = templateUrl;
    this.controller = controller;
    this.selected = false;
}

SelectableMenuEntry.prototype = new AbstractMenuEntry();

