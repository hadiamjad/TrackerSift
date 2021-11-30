# TrackerSift: untangling mixed tracking and functional web resources
Trackers have recently started to mix tracking and functional resources to circumvent privacy-enhancing content blocking tools. Such mixed web resources put content blockers in a bind: risk breaking legitimate functionality if they act and risk missing privacy-invasive advertising and tracking if they do not. In this paper, we propose TrackerSift to progressively classify and untangle mixed web resources (that combine tracking and legitimate functionality) at multiple granularities of analysis (domain, hostname, script, and method). Using TrackerSift, we conduct a large-scale measurement study of such mixed resources on 100K websites. We find that more than 17% domains, 48% hostnames, 6% scripts, and 9% methods observed in our crawls combine tracking and legitimate functionality. While mixed web resources are prevalent across all granularities, TrackerSift is able to attribute 98% of the script-initiated network requests to either tracking or functional resources at the finest method-level granularity. Our analysis shows that mixed resources at different granularities are typically served from CDNs or as in-lined and bundled scripts, and that blocking them indeed results in breakage of legitimate functionality. Our results highlight opportunities for finer-grained content blocking to remove mixed resources without breaking legitimate functionality.
You can read about this approach in this paper: https://dl.acm.org/doi/abs/10.1145/3487552.3487855

P.S This work is published at ACM IMC 2021. 

## Implementation
![image](https://user-images.githubusercontent.com/46374292/144054324-242b6698-433f-4f33-aaf9-06e15631cbaa.png)

This paper conducts a measurement and anlysis using:
- chrome extension
- express server
- selenium automation

## Files Distribution
### express server: 
```
npm install
```
It will install the following dependencies:
1. chrome driver
2. Selenium
3. pandas 

### chrome_extension
It is the unpacked version of the chrome extension. It uses the DevTools API to capture network request information at the background.

### selenium automation
It automates the visiting process.

## Working
1. start the local server after installing
```
node server.js
```
2. Before starting selenium automation code, provide appropriate link to unpacked extension and list of sites url that you want to visit and then run the traces.py


> All rights reserved
