/*
'use strict';

var Shuffle = window.Shuffle;

var Post = function (element) {
    this.element = element;

    this.shuffle = new Shuffle(element, {
        itemSelector: '.picture-item',
        sizer: element.querySelector('.my-sizer-element'),
    });

    // Log events.
    this.addShuffleEventListeners();

    this._activeFilters = [];

    this.addFilterButtons();
    this.addSorting();
    this.addSearchFilter();

    this.mode = 'exclusive';
};

Post.prototype.toggleMode = function () {
    if (this.mode === 'additive') {
        this.mode = 'exclusive';
    } else {
        this.mode = 'additive';
    }
};

/**
 * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
 * for them like you normally would (with jQuery for example).
 */
/*
Post.prototype.addShuffleEventListeners = function () {
    this.shuffle.on(Shuffle.EventType.LAYOUT, function (data) {
        console.log('layout. data:', data);
    });

    this.shuffle.on(Shuffle.EventType.REMOVED, function (data) {
        console.log('removed. data:', data);
    });
};

Post.prototype.addFilterButtons = function () {
    var options = document.querySelector('.filter-options');

    if (!options) {
        return;
    }

    var filterButtons = Array.from(options.children);

    filterButtons.forEach(function (button) {
        button.addEventListener('click', this._handleFilterClick.bind(this), false);
    }, this);
};

Post.prototype._handleFilterClick = function (evt) {
    var btn = evt.currentTarget;
    var isActive = btn.classList.contains('active');
    var btnGroup = btn.getAttribute('data-group');

    // You don't need _both_ of these modes. This is only for the Post.

    // For this custom 'additive' mode in the Post, clicking on filter buttons
    // doesn't remove any other filters.
    if (this.mode === 'additive') {
        // If this button is already active, remove it from the list of filters.
        if (isActive) {
            this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
        } else {
            this._activeFilters.push(btnGroup);
        }

        btn.classList.toggle('active');

        // Filter elements
        this.shuffle.filter(this._activeFilters);

        // 'exclusive' mode lets only one filter button be active at a time.
    } else {
        this._removeActiveClassFromChildren(btn.parentNode);

        var filterGroup;
        if (isActive) {
            btn.classList.remove('active');
            filterGroup = Shuffle.ALL_ITEMS;
        } else {
            btn.classList.add('active');
            filterGroup = btnGroup;
        }

        this.shuffle.filter(filterGroup);
    }
};

Post.prototype._removeActiveClassFromChildren = function (parent) {
    var children = parent.children;
    for (var i = children.length - 1; i >= 0; i--) {
        children[i].classList.remove('active');
    }
};

Post.prototype.addSorting = function () {
    var buttonGroup = document.querySelector('.sort-options');

    if (!buttonGroup) {
        return;
    }

    buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
};

Post.prototype._handleSortChange = function (evt) {
    // Add and remove `active` class from buttons.
    var wrapper = evt.currentTarget;
    var buttons = Array.from(evt.currentTarget.children);
    buttons.forEach(function (button) {
        if (button.querySelector('input').value === evt.target.value) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Create the sort options to give to Shuffle.
    var value = evt.target.value;
    var options = {};

    function sortByDate(element) {
        return element.getAttribute('data-created');
    }

    function sortByTitle(element) {
        return element.getAttribute('data-title').toLowerCase();
    }

    if (value === 'date-created') {
        options = {
            reverse: true,
            by: sortByDate,
        };
    } else if (value === 'title') {
        options = {
            by: sortByTitle,
        };
    }

    this.shuffle.sort(options);
};

// Advanced filtering
Post.prototype.addSearchFilter = function () {
    var searchInput = document.querySelector('.js-shuffle-search');

    if (!searchInput) {
        return;
    }
    searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
};

/**
 * Filter the shuffle instance by items with a title that matches the search input.
 * @param {Event} evt Event object.
 */
/*
Post.prototype._handleSearchKeyup = function (evt) {
    var searchText = evt.target.value.toLowerCase();

    this.shuffle.filter(function (element, shuffle) {

        // If there is a current filter applied, ignore elements that don't match it.
        if (shuffle.group !== Shuffle.ALL_ITEMS) {
            // Get the item's groups.
            var groups = JSON.parse(element.getAttribute('data-groups'));
            var isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;

            // Only search elements in the current group
            if (!isElementInCurrentGroup) {
                return false;
            }
        }

        var titleElement = element.querySelector('.card-title');
        var bodyElement = element.querySelector('.card-body');
        var titleText = titleElement.textContent.toLowerCase().trim() + bodyElement.textContent.toLowerCase().trim();

        return titleText.indexOf(searchText) !== -1;
    });
};

document.addEventListener('DOMContentLoaded', function () {
    window.Post = new Post(document.getElementById('grid'));
});
*/
//Pagination

(function ($) {
    $(document).ready(function () {
        $.fn.customPaginate = function (options) {
            var paginationContainer = this;
            var itemsToPaginate;

            var defaults = {
                itemsPerPage : 5
            };
            var setting = {};

            var curPage = 1;

            $.extend(setting,defaults , options);

            var itemsPerPage = setting.itemsPerPage;

            itemsToPaginate = $(setting.itemsToPaginate);
            var numberOfPaginationLinks = Math.ceil((itemsToPaginate.length / itemsPerPage));

            $('<ul class="pagination pg-darkgrey flex-center"></ul>').prependTo(paginationContainer);

            for (var index = 0; index < numberOfPaginationLinks + 2; index++) {
                if (index == 0)
                    paginationContainer.find("ul").append('<li class="page-item"><a class= "page-link" aria-label="Previous" ><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>');                
                else if (index == numberOfPaginationLinks+1)
                    paginationContainer.find("ul").append('<li class="page-item"><a class= "page-link" aria-label="Next" ><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>');                
                else
                    paginationContainer.find("ul").append('<li class="page-item"><a class="page-link">'+ index+'</a></li>');
            }

            updatePage = function (page) {
                var temp = paginationContainer.find("ul li");
                for (var index = 0; index < temp.length; index++) {
                    if (temp[index].textContent == page.toString()) {
                        temp[index].classList.add("active");
                    }
                }
                curPage = page;
            };

            clearPage = function () {
                var temp = paginationContainer.find("ul li");
                for (var index = 0; index < temp.length; index++) {
                    if (temp[index].textContent == curPage.toString()) {
                        temp[index].classList.remove("active");
                    }
                }
            };

            updatePage(curPage);
            itemsToPaginate.filter(":gt(" + (itemsPerPage - 1) + ")").hide();

            paginationContainer.find("ul li").on("click", function () {
                console.log($(this).text());

                var linkNumber = curPage;
                if ($(this).text() == "«Previous" && curPage > 1)
                    linkNumber--;
                else if ($(this).text() == "»Next" && curPage < numberOfPaginationLinks)
                    linkNumber++;
                else if ($(this).text() != "»Next" && $(this).text() != "«Previous")
                    linkNumber = $(this).text()

                var itemsToHide = itemsToPaginate.filter(":lt(" + ((linkNumber - 1) * itemsPerPage) + ")");
                $.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((linkNumber * itemsPerPage) - 1) + ")"));
                itemsToHide.hide();

                var itemsToShow = itemsToPaginate.not(itemsToHide);
                itemsToShow.show();
                clearPage();
                updatePage(linkNumber);
            });
            paginationContainer.find("ul li a").on("click", function () {
                var page = curPage;
                var bt = $(this).text();
                if (bt == "Previous" && curPage > 1)
                    page--;
                else if (bt == "Next" && curPage < numberOfPaginationLinks)
                    page++;

                var itemsToHide = itemsToPaginate.filter(":lt(" + ((page - 1) * itemsPerPage) + ")");
                $.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((page * itemsPerPage) - 1) + ")"));
                itemsToHide.hide();

                var itemsToShow = itemsToPaginate.not(itemsToHide);
                itemsToShow.show();
                clearPage();
                updatePage(page);
            });
        }
    });
}(jQuery));

(function ($) {
    $(document).ready(function () {
        $(".paginationCustom").customPaginate({
            itemsToPaginate: ".post"
        });
    });
})(jQuery);