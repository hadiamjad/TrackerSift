from selenium import webdriver
import time
from pyvirtualdisplay import Display
import pandas as pd

# virtual display
display = Display(visible=0, size=(800, 600))
display.start()

df = pd.read_csv(r'test.csv')

for i in df.index:
    try:
        # extension filepath
        ext_file = 'extension'

        opt = webdriver.ChromeOptions()
        # devtools necessary for complete network stack capture
        opt.add_argument("--auto-open-devtools-for-tabs")
        # loads extension
        opt.add_argument("load-extension=" + ext_file)
        # important for linux
        opt.add_argument('--no-sandbox')

        driver = webdriver.Chrome(options=opt)
        driver.get(r'https://www.'+ df['website'][i])
        # sleep
        time.sleep(10)
        driver.quit()
        print(r'Completed: '+ str(i)+ ' website: '+ df['website'][i])
    except:
        print(r'Crashed: '+ str(i) + ' website: '+ df['website'][i])