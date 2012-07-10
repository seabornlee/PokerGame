describe("Position calculate", function() {
		var position = new Position({
			canvasWidth : 1000,
			headerWidth : 150,
			players : 4,
			paddingTop : 5,
			pokerWidth : 90,
			pokerHeight : 120
		});

		var position2 = new Position({
			canvasWidth : 1200,
			headerWidth : 150,
			players : 4,
			paddingTop : 5
		});

	it("Calc headers gap", function() {
		expect(position.getGap(150)).toEqual(80);
		expect(position2.getGap(150)).toEqual(120);
	});
	
	it("Calc headers position", function() {
		expect(position.getHeader(0)).toEqual({x:80, y:5});
		expect(position.getHeader(1)).toEqual({x:310, y:5});
		expect(position2.getHeader(0)).toEqual({x:120, y:5});
		expect(position2.getHeader(1)).toEqual({x:390, y:5});
	});

	it("Calc poker position", function() {
		expect(position.getPoker(0)).toEqual({x:128, y:160});	
		expect(position.getPoker(1)).toEqual({x:346, y:160});	
		expect(position.getPoker(2)).toEqual({x:564, y:160});	
	});
});

(function() {
   var jasmineEnv = jasmine.getEnv();
     jasmineEnv.updateInterval = 250;

	   /**
		    Create the `HTMLReporter`, which Jasmine calls to provide results of each spec and each suite. The Reporter is responsible for presenting results to the user.
			   */
	   var htmlReporter = new jasmine.HtmlReporter();
	     jasmineEnv.addReporter(htmlReporter);

		   /**
			    Delegate filtering of specs to the reporter. Allows for clicking on single suites or specs in the results to only run a subset of the suite.
				   */
		   jasmineEnv.specFilter = function(spec) {
		       return htmlReporter.specFilter(spec);
			     };

				   /**
					    Run all of the tests when the page finishes loading - and make sure to run any previous `onload` handler

						   ### Test Results

						      Scroll down to see the results of all of these specs.
							     */
		     var currentWindowOnload = window.onload;
			   window.onload = function() {
					       if (currentWindowOnload) {
								         currentWindowOnload();
										     }

						       document.querySelector('.version').innerHTML = jasmineEnv.versionString();
							       execJasmine();
								     };

			     function execJasmine() {
						     jasmineEnv.execute();
							   }
})();
