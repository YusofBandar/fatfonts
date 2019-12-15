# fatfonts

FatFonts is a graphical technique conceived and developed by Miguel Nacenta, Uta Hinrichs, and Sheelagh Carpendale. See http://fatfonts.org/ more info. This repo uses d3 to take any 2d array of values and outputs fatfonts.

Fatfonts are designed so that the amount of dark pixels in a numeral character is proportional to the number it represents. For example, “2? has twice the ink than “1?, “8? has two times the amount of dark ink than “4? etc. You can see this easily in the set of characters below:

 ![Cubica Font](https://github.com/YusofBandar/fatfonts/blob/master/docs/cubica.png)

### Structure

`font.js` defines a new font type, path to svg files and how to position nested digits

`fatfonts.js` takes a 2d array of values, an font type and outputs position and data size data for each value

`draw.js` takes 2d array of position data and draws fatfonts visulisation either as a svg or to canvas

### Gallery

 ![Moon](https://github.com/YusofBandar/fatfonts/blob/master/docs/moon.JPG)

![Sicely](https://github.com/YusofBandar/fatfonts/blob/master/docs/sicely.png)
 
![Humming Bird](https://github.com/YusofBandar/fatfonts/blob/master/docs/humming_bird.PNG)
  
![Humming Bird Zoom](https://github.com/YusofBandar/fatfonts/blob/master/docs/humming_bird_zoom.PNG)
