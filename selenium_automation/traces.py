import chromedriver_binary
from selenium import webdriver
import time


# extension filepath
ext_file = 'D:\Downloads\Sem 6\ALGO\stack traces\extension'

opt = webdriver.ChromeOptions()
# devtools necessary for complete network stack capture
opt.add_argument("--auto-open-devtools-for-tabs")
# loads extension
opt.add_argument("load-extension=" + ext_file)
driver = webdriver.Chrome(options=opt)
driver.get('https://www.atresplayer.com/')
# sleep
time.sleep(10)
driver.quit()