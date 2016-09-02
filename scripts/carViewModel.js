function carViewModel() {
    var self = this;
    self.cars = ko.observableArray([
        new Car({ brand: 'BMW', model: '325', price: 1500, engine: 'diesel', year: 1980, images: ['content/car-pictures/bmw-325.jpg'] } ),
        new Car({ brand: 'Mercedes Benz', model: 'E320', price: 3500, engine: 'petrol', year: 1999, images: ['content/car-pictures/mercedes-E320.jpg']}),
        new Car({ brand: 'Audi', model: 'A8', price: 20000, engine: 'diesel', year: 2001, images: ['content/car-pictures/audi-a8.jpg']}),
        new Car({ brand: 'Skoda', model: 'Octavia', price: 7650, engine: 'petrol', year: 2008, images: ['content/car-pictures/skoda-octavia.jpg']}),
        new Car({ brand: 'Dacia', model: 'Logan', price: 12500, engine: 'petrol', year: 2015, images: ['content/car-pictures/dacia-logan.jpg']}),
        new Car({ brand: 'Lada', model: 'Samara', price: 10100, engine: 'diesel', year: 2005, images: ['content/car-pictures/lada-samara.jpg']}),
        new Car({ brand: 'Opel', model: 'Vectra', price: 9990, engine: 'petrol' , year: 1988, images: ['content/car-pictures/opel-vectra.jpg']}),
        new Car({ brand: 'Renault', model: 'Megane', price: 8900, engine: 'electric', year: 2011, images: ['content/car-pictures/renault-megane.jpg']}),
        new Car({ brand: 'Mercedes', model: 'S500', price: 3500, engine: 'diesel', year: 1985, images: ['content/car-pictures/mercedes-s500.jpg']}),
        new Car({ brand: 'Skoda', model: 'Octavia', price: 7650, engine: 'diesel', year: 2014, images: ['content/car-pictures/skoda-octavia.jpg']}),
        new Car({ brand: 'Skoda', model: 'Felicia', price: 7650, engine: 'petrol', year: 2013, images: ['content/car-pictures/skoda-felicia.jpg']}),
        new Car({ brand: 'BMW', model: 'M8', price: 1500, engine: 'petrol', year: 2007, images: ['content/car-pictures/bmw-m8.jpg'] }),
        new Car({ brand: 'Saab', model: '93', price: 250, engine: 'petrol', year: 2008, images: ['content/car-pictures/saab-93.jpg']}),
        new Car({ brand: 'Tesla', model: 'Model S', price: 25000, engine: 'electric', year: 2015, images: ['content/car-pictures/tesla-models.jpg', 'content/car-pictures/TeslaS-2.jpg', 'content/car-pictures/TeslaS-3.jpg'] }),
        new Car({ brand: 'Tesla', model: 'Model 3', price: 35000, engine: 'electric', year: 2016, images: ['content/car-pictures/section-exterior-profile.jpg','content/car-pictures/tesla-model3 -1.jpg'] })
    ]);

    self.isVisibleMap = ko.observable(false);
    self.filterArray = ko.observableArray([
        self.brand = ko.observable('All'),
        self.engine = ko.observable('All'),
        self.year = ko.observable('All')
    ]);
    self.sortersArray = ko.observableArray(['None','price', 'year']);
    self.sorter = ko.observable();
    self.sortOrder = ko.observable(true);

    self.engines = (getEngineTypes());
    self.brands = (getBrands());
    self.years = (getYears());

    self.allFilters = ko.observableArray([{engine:self.engine}, {brand:self.brand}, {year:self.year}]);
    self.filteredList = ko.computed(function () {
        var currentList = self.cars();
        var currentFilters = self.allFilters();

        ko.utils.arrayForEach(currentFilters, function (filter) {
            var filterName = Object.getOwnPropertyNames(filter)[0];
            var filterValue = filter[filterName]();
            if (!filterValue || filterValue == "All") {
                return currentList;
            } else {
                currentList = ko.utils.arrayFilter(currentList, function(car) {
                    if(typeof filterValue ==='number'){
                        return car[filterName]>=filterValue;
                    }
                    return car[filterName] === filterValue;
                });
            }
        });
        return currentList;
    }, this, {deferEvaluation: false});
    self.resetFilters = function () {
        self.filterArray().forEach(function (filter) {
            filter('All');
        });
    };
    self.sorter.subscribe(function () {
        self.resultSort();
    });
    self.sortOrder.subscribe(function () {
        self.resultSort();
    });
    self.brand.subscribe(function () {attachClickEvents()});
    self.engine.subscribe(function () {attachClickEvents()});
    self.year.subscribe(function () {attachClickEvents()});

    self.resultSort = function () {
        self.cars.sort(function (a, b) {
            if(self.sortOrder()){
                return a[self.sorter()]-b[self.sorter()]
            }
            return b[self.sorter()]-a[self.sorter()];
        })
    };

    function getBrands() {
        var hash = {},uniqueBrands = ['All'];
        self.cars().forEach(function (car) {
            if ( !hash.hasOwnProperty(car.brand) ) {
                hash[ car.brand ] = true;
                uniqueBrands.push(car.brand);
            }
        });
        return uniqueBrands;
    }

    function getEngineTypes() {
        var hash = {},uniqueEngines = ['All'];
        self.cars().forEach(function (car) {
            if ( !hash.hasOwnProperty(car.engine) ) {
                hash[ car.engine ] = true;
                uniqueEngines.push(car.engine);
            }
        });
        return uniqueEngines;
    }

    function getYears() {
        var hash = {},uniqueYears = ['All'];
        self.cars().forEach(function (car) {
            if ( !hash.hasOwnProperty(car.year) ) {
                hash[ car.year ] = true;
                uniqueYears.push(car.year);
            }
        });
        return uniqueYears.sort(function (a, b) {
            return a-b;
        });
    }

     function attachClickEvents() {
         console.log('click');
        $('.main-image').each(function() { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled:true
                }
            });
        }).on('click', function (e) {
            $(e.target).children().first().trigger('click');
        });
         $('.more-info').each(function () {
             $(this).magnificPopup({
                 items: {src:$(this).prev()},
                 type: 'inline'
             });
         });
    }
}

ko.applyBindings(new carViewModel());
