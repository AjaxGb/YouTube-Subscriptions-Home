// ==UserScript==
// @name         YouTube Subscription Home
// @version      1.0
// @description  Replace the YouTube home page with the subscriptions feed
// @author       AjaxGb
// @match        http*://www.youtube.com/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    if(window.location.pathname === '/') return (window.location.pathname = '/feed/subscriptions');

    function editLink(a){
        if(a.host === 'www.youtube.com' && a.pathname === '/'){
            a.pathname = '/feed/subscriptions';
        }
    }

    const observer = new MutationObserver(function(mrs){
		for(let i = mrs.length - 1; i >= 0; --i){
            if(mrs[i].type === 'attributes'){
                return editLink(mrs[i].target);
            }
            const newHome = document.getElementById('what_to_watch-guide-item'),
                  newSubs = document.getElementById('subscriptions-guide-item');
            if(newHome !== home || newSubs !== subs){
                home = newHome;
                subs = newSubs;
                if(home && subs){
                    home.parentElement.insertBefore(subs, home);
                    home.hidden = true;
                }
            }
			const an = mrs[i].addedNodes;
			for(let j = an.length - 1; j >= 0; --j){
                const n = an[j];
				if(n.href) editLink(n);
                if(n.getElementsByTagName){
					const ca = n.getElementsByTagName('a');
                    for(let k = ca.length - 1; k >= 0; --k){
                        editLink(ca[k]);
                    }
				}
			}
		}
	});
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,
        attributes: true,
        attributeFilter: ['href']
	});

    const allA = document.getElementsByTagName('a');
    for(let k = allA.length - 1; k >= 0; --k){
        editLink(allA[k]);
    }

    let home = document.getElementById('what_to_watch-guide-item'),
        subs = document.getElementById('subscriptions-guide-item');
    if(home && subs){
        home.parentElement.insertBefore(subs, home);
        home.hidden = true;
    }
})();
