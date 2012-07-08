function Poking() {
		var currentResult = [];
			function getTheMax() {
				if (currentResult.length == 0) {
					return 0;
				}

				var maxPoker = currentResult[0];
				var maxIndex = 0;
				for (i in currentResult) {
					var poker1 = currentResult[i];
					if (compare(poker1, maxPoker) > 0) {
						maxPoker = currentResult[i];	
						maxIndex = i;
					}
				}
				return maxIndex;
			}
                function pokerDumbbell(pokerTotal) {
					currentResult = getNumbersPoker(pokerTotal);
                    return currentResult; 
                }
                function getNumbersPoker(num) {
                    var pokerArr = [];
                    for (var i = 0; i < num; i++) {
                        var onePoker = getPoker();
                        if (hasSamePoker(pokerArr, onePoker)) {
                            i = 0;
                            continue;
                        } else {
                            pokerArr.push(onePoker);
                            if (pokerArr.length == num) {
                                i = num + 1;
                            }
                        }
                    }
                    return pokerArr;
                }
                function getPoker() {
					var poker = {};
                    poker.color = getRandomNumber(4);
                    poker.index = getRandomNumber(13);
                    return poker;
                }
                function getRandomNumber(scope) {
                    var ranNum = Math.floor(Math.random() * scope);
                    return ranNum;
                }

                function hasSamePoker(pArr, poker) {
                    for (var i = 0, len = pArr.length; i < len; i++) {
                        if (isSame(pArr[i], poker)) {
                            return true;
                        }
                    }
                    return false;
                }

                function compare(poker1, poker2, withColor) {
					if (!withColor) {
						return poker1.index - poker2.index;
					}

					//todo
				}
                function isSame(poker1, poker2) { 
                    return compare(poker1, poker2) == 0; 
                }
				this.pokerDumbbell = pokerDumbbell;
				this.getTheMax = getTheMax;
};
