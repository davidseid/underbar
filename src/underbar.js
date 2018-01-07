(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {return array[array.length-1];}
    if (n > array.length) {return array;}
    return array.slice(array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else { 
      for (var propertyKey in collection) {
        iterator(collection[propertyKey], propertyKey, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
  
    var filtered = [];
    
    _.each(collection, function(item, index) {
      if (test(item)) {
        filtered.push(item);
      }
    });
    
    return filtered;
  
    
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    
    return _.filter(collection, function(item, index) {
      if (test(item) === false) { return item};
    });
    
    
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
  
    if (!isSorted) {
	  var uniqueArray = [];
	
	  _.each(array, function(item, index) {
		if (_.indexOf(uniqueArray, item) === -1) {
		  uniqueArray.push(item);
		}
	  });
	
	  return uniqueArray;
	}
    
    
    if (isSorted) {
      var iteratedArray = []
      for (var i = 0; i < array.length; i++) {
        iteratedArray.push(iterator(array[i]));
      }          
      
      var uniqueIterated = [];
      _.each(iteratedArray, function(item, index) {
        if (_.indexOf(uniqueIterated, item) === -1) {
          uniqueIterated.push(item);
        }
      });
      
      var uniqueIndexes = [];
      
      _.each(uniqueIterated, function(item, index) {

        for (var j = 0; j < iteratedArray.length; j++) {
          if (item === iteratedArray[j]) {
            uniqueIndexes.push(array[j]);
            break;
          }
        }
      });
      return uniqueIndexes;
    }
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    
    var mappedArray = []
    
    _.each(collection, function(item, index) {
      mappedArray.push(iterator(item));
    });
    
    return mappedArray;
    
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
        
    if (accumulator != undefined) {
    
      _.each(collection, function(item) {
        accumulator = iterator(accumulator, item);
      });
      
      return accumulator;
    } else {
      
      accumulator = collection[0];
      
      collection = collection.slice(1);
      
      _.each(collection, function(item) {
        accumulator = iterator(accumulator, item);
      });
      
      return accumulator;
    }    
    
    //previous implementation of _.reduce without _.each, wasn't working properly
    /*
    if (accumulator != undefined) {
      for (var i = 0; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
      return accumulator;
    } else {
      accumulator = collection[0];
      for (var j = 1; j < collection.length; j++) {
        accumulator = iterator(accumulator, collection[j]);
      }
      return accumulator;
    }
    */
    
  
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    
      
    
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);

    // previous implementation of _.contains, without _.reduce
    /*
    if (Array.isArray(collection)) {
      
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          return true;
        }
      }
      return false;
    } else {
      for (var propertyKey in collection) {
		if (collection[propertyKey] === target) {
		  return true;
		}
	  }
	  return false;
    }
    */  
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    
   
    if (iterator) {
    
		var allTrue = true;
	
		for (var i = 0; i < collection.length; i++) {
		  if (iterator(collection[i]) == false || iterator(collection[i]) == undefined) {
			allTrue = false;
			break;
		  }
		}
	
		return allTrue;
    } else {
    
       var allTrue = true;
	
		for (var i = 0; i < collection.length; i++) {
		  if (collection[i] == false || collection[i] == undefined) {
			allTrue = false;
			break;
		  }
		}
		
		return allTrue;
    }
   
  
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    
    // if every item is false after the iterator, return false, otherwise return true
    if (iterator) {
      var newCollection = _.map(collection, iterator);
    } else {
      var newCollection = collection;
    }
    
    var isFalse = function(item) {
      return item ? false : true;
    }
    
    if (_.every(newCollection, isFalse)) {
      return false;
    } else {
      return true;
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  
    var args = arguments;
    var destination = args[0];
    
    var sources = Array.prototype.slice.call(args);
    sources = sources.slice(1);

	_.each(sources, function(source) {
	  for (var propKey in source) {
	    destination[propKey] = source[propKey];
	  }
	});
	
	return destination;


  
  };


  _.defaults = function(obj) {
  
    var args = arguments;
    var destination = args[0];
    
    var sources = Array.prototype.slice.call(args);
    sources = sources.slice(1);
    
    _.each(sources, function(source) {
      for (var propKey in source) {
        if (destination[propKey] === undefined) {
          destination[propKey] = source[propKey];
        }
      }
    });
    
    return destination;
    

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  
    // create an array that holds the arguments and the results in an array
    // when the function is called, check if the arguments match any already stored
    // if so return the associated results
    // otherwise call the function 
    
    var storage = {};
    
    return function() {
    
		var args = JSON.stringify(arguments);
		if(storage[args]) {
		
		  return storage[args];
		}
		
		else {
		
		  var result = func.apply(this, arguments);
		  storage[args] = result;
		  return result;
		}
	};
   
  
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  
    
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    
    var arrayCopy = array.slice();
    
    var shuffled = [];
    
    while (arrayCopy.length > 0) {
      
      var indexToPull = Math.floor(Math.random() * (arrayCopy.length));
    
      
      var valueToAdd = arrayCopy[indexToPull];
      
      shuffled.push(valueToAdd);
      
      arrayCopy.splice(indexToPull, 1);
    }
    
    return shuffled;
    
    
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  
    var result = [];
    
    if (typeof functionOrKey === 'function') {
    
      _.each(collection, function(element) {
        var answer = functionOrKey.apply(element, args);
        result.push(answer);
      });
      
    } else {
    
      _.each(collection, function(element) {
        var answer = element[functionOrKey].apply(element, args);
        result.push(answer);
      });
    }
    
    return result;
    
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  
    if (typeof iterator === 'function') {
    
      _.each(collection, function(element, index) {
      
        var bottom = index;
        
        for (var i = index + 1; i < collection.length; i++) {
          
          if (iterator(collection[i]) < iterator(collection[bottom]) || collection[bottom] === undefined) {
            bottom = i;
          }
        }
        
        if (bottom != index) {
          
          var holder = collection[index];
          collection[index] = collection[bottom];
          collection[bottom] = holder;
        }
      
      });
      
      
    } else {
    
      _.each(collection, function(element, index) {
        
        var bottom = index;
        
        for (var i = index + 1; i < collection.length; i++) {
        
          if (collection[i][iterator] < collection[bottom][iterator] || collection[bottom] === undefined) {
            bottom = i;
          }
        }
        
        if (bottom != index) {
          
          var holder = collection[index];
          collection[index] = collection[bottom];
          collection[bottom] = holder;
        }
      
      });
      
    }
    
    return collection;
    
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    
    
    var args = Array.prototype.slice.call(arguments, 0);
    
    var argLengths = _.map(args, function(element) {
      return element.length;
    });
        
	var indexOfLongestArg = _.indexOf(argLengths, Math.max.apply(null, argLengths));
    var longestArg = args[indexOfLongestArg];
        
    var zipped = [];
    _.each(longestArg, function(element, index) {
      
      var zip = [];
      
      _.each(args, function(array) {
        
        
        zip.push(array[index]);
      
      });
      
      zipped.push(zip);
      
    });
    
    return zipped;
  
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    
    var newArray = [];
    
    // loop through each element of the nestedarray, 
    // if it is a value, add it to the newArray
    // if it is an array, do again
    
    _.each(nestedArray, function(element) {
      
      if (!Array.isArray(element)) {
        newArray.push(element);
      } else {
        newArray = newArray.concat(_.flatten(element));
      }
      
    });
    
    return newArray;
  
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  
    var args = Array.prototype.slice.call(arguments);
    var argLengths = _.map(args, function(element) {
      return element.length;
    });
    
    var indexOfLongestArg = _.indexOf(argLengths, Math.max.apply(null, argLengths));
    var longestArg = args[indexOfLongestArg];
    
    var intersected = [];
    
    // for each element in the longest array
    // if each of the other arg arrays has that element
    // push it to intersected
    // return intersected
    
    _.each(longestArg, function(element) {
    
      
      var inAllArrays = true;
      
      
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        
        if (!_.contains(arg, element)) {
          inAllArrays = false;
          break;
        }
      
      }
      
      if (inAllArrays) {
        intersected.push(element);
      }
      
    });
    
    return intersected;
    
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  
    var args = Array.prototype.slice.call(arguments);
    
    var firstArray = args[0];
    var otherArrays = args.slice(1);
    
    var different = [];
    
    _.each(firstArray, function(element) {
    
      var isDifferent = true;
    
      for (var i = 0; i < otherArrays.length; i++) {
        
        if (_.contains(otherArrays[i], element)) {
          isDifferent = false;
          break;
        }
      }
      
      if (isDifferent) {
        different.push(element);
      }
      
    });
    
    return different;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  
    var hold = false;
    
    return function() {
      
      if (!hold) {
        func.apply(null, arguments)
        hold = true;
        
        setTimeout(function() {
          hold = false;
        }, wait);
      }
    }
  };
}());
