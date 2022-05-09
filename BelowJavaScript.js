localStorage.clear();
var room = "surface";
var inventoryOpen = false;
var leftText = "";
var rightText = "";
var bottomText = "";
var flavourText = "";

var JSONFile;
var saveData = "";
var loadedData = "";


//images 
var imageCaveFace = new Image();
imageCaveFace.src = "Images/CaveFace.png";

var image1stCave = new Image();
image1stCave.src = "Images/1stCave.png";

var imageLitTunnelWithMonster = new Image();
imageLitTunnelWithMonster.src = "Images/cave with monster light.png";
var imageLitTunnelWithoutMonster = new Image();
imageLitTunnelWithoutMonster.src = "Images/cave with monster dead light.png";

var imageDarkTunnelWithMonster = new Image();
imageDarkTunnelWithMonster.src = "Images/cave with monster dark.png";
var imageDarkTunnelWithoutMonster = new Image();
imageDarkTunnelWithoutMonster.src = "Images/cave with monster dead dark.png";

var imageBossRoom = new Image();
imageBossRoom.src = "Images/boss room.png";

var imageChestRoom2 = new Image();
imageChestRoom2.src = "Images/ChestRoom3.png";
var imageChestRoom3 = new Image();
imageChestRoom3.src = "Images/ChestRoom4.png";

var image1stSword = new Image();
image1stSword.src = "Images/wood sword.png";

var image2ndSword = new Image();
image2ndSword.src = "Images/iron sword.png";

var image3rdSword = new Image();
image3rdSword.src = "Images/gold sword.png";

var imageShield = new Image();
imageShield.src = "Images/shield.png";

var imageArmour = new Image();
imageArmour.src = "Images/chest plate.png";

var imageHealthOn = new Image();
imageHealthOn.src = "Images/health symbol.png";
var imageHealthOff = new Image();
imageHealthOff.src = "Images/health symbol off.png";



var leftClick = false;
var rightClick = false;
var bottomClick = false;
var goblinIsDead = false;
var alienIsDead = false;
var maxPlayerHealth = 2;
var currentHealth = maxPlayerHealth;
var lvl1Sword = false;
var lvl2Sword = false;
var lvl3Sword = false;
var shield = false;
var armour = false;
var firstChestLooted = false;
var secondChestLooted = false;
var thirdChestLooted = false;
var forthChestLooted = false;
var fifthChestLooted = false;
var startTime = 0;
var finishTime = 0;
var completeTime = 0;
var savedTime = 0;
var animationActive = true;


var lvl1SwordB = 0;
var lvl2SwordB = 0;
var lvl3SwordB = 0;
var shieldB = 0;
var armourB = 0;
var goblinIsDeadB = 0;
var alienIsDeadB = 0;
var firstChestLootedB = 0;
var secondChestLootedB = 0;
var thirdChestLootedB = 0;
var forthChestLootedB = 0;
var fifthChestLootedB = 0;



function saveGame(text, fileName) {
    var a = document.createElement("a");
    a.setAttribute("href", "data: text / plain; charset=utf-8," + encodeURIComponent(text));
    a.setAttribute("download", fileName);
    a.click();
}



function drawScene() {
    var ctx = backgroundCanvas.getContext("2d");

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;


    if (room == "surface") {
        ctx.drawImage(imageCaveFace, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
    }
    if (room == "1stTunnel") {
        ctx.drawImage(image1stCave, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
    }
    if (room == "litTunnel") {
        if (goblinIsDead == false) {
            ctx.drawImage(imageLitTunnelWithMonster, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
        } else {
            ctx.drawImage(imageLitTunnelWithoutMonster, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
        }
    }
    if (room == "darkTunnel") {
        if (alienIsDead == false) {
            ctx.drawImage(imageDarkTunnelWithMonster, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
        } else {
            ctx.drawImage(imageDarkTunnelWithoutMonster, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
        }
    }
    if (room == "chestRoom2") {
        
        ctx.drawImage(imageChestRoom2, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
       
    }
    if (room == "chestRoom3") {

        ctx.drawImage(imageChestRoom3, 0, 0, backgroundCanvas.width, backgroundCanvas.height);

    }
    if (room == "bossRoom") {

        ctx.drawImage(imageBossRoom, 0, 0, backgroundCanvas.width, backgroundCanvas.height);

    }

    if (inventoryOpen == false) {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.fillStyle = "grey";
        if (backgroundCanvas.width / 10 < 150) {
            ctx.fillRect(0, 0, 150, 70);
        } else {
            ctx.fillRect(0, 0, backgroundCanvas.width / 10, backgroundCanvas.height / 10);
        }
        
        ctx.fillStyle = "black";
        ctx.font = "130% Arial"
        if (backgroundCanvas.height / 18 < 30) {
            ctx.fillText("Inventory", backgroundCanvas.width / 35, 30);
        } else {
            ctx.fillText("Inventory", backgroundCanvas.width / 35, backgroundCanvas.height / 18);
        }
        
        ctx.stroke();

        //left text box
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "yellow";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(backgroundCanvas.width / 10, backgroundCanvas.height / 2, 2 * backgroundCanvas.width / 10, backgroundCanvas.height / 10);
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        ctx.font = "130% Arial"
        ctx.fillText(leftText, backgroundCanvas.width / 10 + 5, backgroundCanvas.height / 2 + 30);
        ctx.stroke();

        //right text box
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "yellow";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(backgroundCanvas.width / 10 * 7, backgroundCanvas.height / 2, backgroundCanvas.width / 10 * 2, backgroundCanvas.height / 10);
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        ctx.font = "130% Arial"
        ctx.fillText(rightText, (backgroundCanvas.width / 10 * 7) + 5, backgroundCanvas.height / 2 + 30);
        ctx.stroke();

        //bottom text box
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "yellow";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(backgroundCanvas.width / 10 * 4, backgroundCanvas.height / 10 * 8, backgroundCanvas.width / 10 * 2, backgroundCanvas.height / 10);
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        ctx.font = "130% Arial"
        ctx.fillText(bottomText, (backgroundCanvas.width / 10 * 4) + 5, (backgroundCanvas.height / 10 * 8) + 30);
        ctx.stroke();

        //flavour text box
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.font = "130% Arial";
        ctx.fillText(flavourText, (backgroundCanvas.width / 10 * 4), backgroundCanvas.height / 10 * 6);
        ctx.stroke();

        

    } else {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.fillStyle = "grey";
        ctx.globalAlpha = 0.9;
        ctx.fillRect(backgroundCanvas.width / 10, backgroundCanvas.height / 10, 8 * backgroundCanvas.width / 10, 8 * backgroundCanvas.height / 10);
        ctx.globalAlpha = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo((backgroundCanvas.width / 10) * 9 - 5, (backgroundCanvas.height / 10) + 5);
        ctx.lineTo((backgroundCanvas.width / 10) * 9 - 25, (backgroundCanvas.height / 10) + 25);
        ctx.moveTo((backgroundCanvas.width / 10) * 9 - 25, (backgroundCanvas.height / 10) + 5);
        ctx.lineTo((backgroundCanvas.width / 10) * 9 - 5, (backgroundCanvas.height / 10) + 25);
        ctx.stroke();
        if (lvl1Sword == false) {

        }
        if (lvl1Sword == true) {
            ctx.drawImage(image1stSword, backgroundCanvas.width / 10 * 2, backgroundCanvas.height / 10 * 2, backgroundCanvas.height / 5, backgroundCanvas.height / 5);
        }
        if (lvl2Sword == true) {
            ctx.drawImage(image2ndSword, backgroundCanvas.width / 10 * 2, backgroundCanvas.height / 10 * 2, backgroundCanvas.height / 5, backgroundCanvas.height / 5);
        }
        if (lvl3Sword == true) {
            ctx.drawImage(image3rdSword, backgroundCanvas.width / 10 * 2, backgroundCanvas.height / 10 * 2, backgroundCanvas.height / 5, backgroundCanvas.height / 5);
        }
        if (shield == true) {
            ctx.drawImage(imageShield, backgroundCanvas.width / 10 * 4, backgroundCanvas.height / 10 * 2, backgroundCanvas.height / 5, backgroundCanvas.height / 5);
        }
        if (armour == true) {
            ctx.drawImage(imageArmour, backgroundCanvas.width / 10 * 6, backgroundCanvas.height / 10 * 2, backgroundCanvas.height / 5, backgroundCanvas.height / 5);
        }
    }

    if (maxPlayerHealth > 0) {
        ctx.drawImage(imageHealthOff, backgroundCanvas.width / 10 * 4, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (maxPlayerHealth > 1) {
        ctx.drawImage(imageHealthOff, backgroundCanvas.width / 10 * 4.5, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (maxPlayerHealth > 2) {
        ctx.drawImage(imageHealthOff, backgroundCanvas.width / 10 * 5, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (maxPlayerHealth > 3) {
        ctx.drawImage(imageHealthOff, backgroundCanvas.width / 10 * 5.5, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (maxPlayerHealth > 4) {
        ctx.drawImage(imageHealthOff, backgroundCanvas.width / 10 * 6, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }


    if (currentHealth > 0) {
        ctx.drawImage(imageHealthOn, backgroundCanvas.width / 10 * 4, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (currentHealth > 1) {
        ctx.drawImage(imageHealthOn, backgroundCanvas.width / 10 * 4.5, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (currentHealth > 2) {
        ctx.drawImage(imageHealthOn, backgroundCanvas.width / 10 * 5, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (currentHealth > 3) {
        ctx.drawImage(imageHealthOn, backgroundCanvas.width / 10 * 5.5, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }
    if (currentHealth > 4) {
        ctx.drawImage(imageHealthOn, backgroundCanvas.width / 10 * 6, backgroundCanvas.height / 20, backgroundCanvas.height / 20, backgroundCanvas.height / 20);
    }


    if (room == "surface") {
        leftText = "Enter tunnel";
        rightText = "Save";
        bottomText = "Load";
        
        if (leftClick == true) {
            room = "1stTunnel"
            leftClick = false;
        }
        if (rightClick == true) {
            animationActive = false;
            var userName = prompt("Please enter your name", "Name");
            while (userName == "" || userName == "Name") {
                var userName = prompt("Invalid name, please try again", "Name");
            }
            if (userName !== "" || userName !== "Name") {


                if (lvl1Sword == true) {
                    lvl1SwordB = 1;
                } else {
                    lvl1SwordB = 0;
                }

                if (lvl2Sword == true) {
                    lvl2SwordB = 1;
                } else {
                    lvl2SwordB = 0;
                }

                if (lvl3Sword == true) {
                    lvl3SwordB = 1;
                } else {
                    lvl3SwordB = 0;
                }

                if (shield == true) {
                    shieldB = 1;
                } else {
                    shieldB = 0;
                }

                if (armour == true) {
                    armourB = 1;
                } else {
                    armourB = 0;
                }

                if (goblinIsDead == true) {
                    goblinIsDeadB = 1;
                } else {
                    goblinIsDeadB = 0;
                }

                if (alienIsDead == true) {
                    alienIsDeadB = 1;
                } else {
                    alienIsDeadB = 0;
                }

                if (firstChestLooted == true) {
                    firstChestLootedB = 1;
                } else {
                    firstChestLootedB = 0;
                }

                if (secondChestLooted == true) {
                    secondChestLootedB = 1;
                } else {
                    secondChestLootedB = 0;
                }

                if (thirdChestLooted == true) {
                    thirdChestLootedB = 1;
                } else {
                    thirdChestLootedB = 0;
                }

                if (forthChestLooted == true) {
                    forthChestLootedB = 1;
                } else {
                    forthChestLootedB = 0;
                }

                if (fifthChestLooted == true) {
                    fifthChestLootedB = 1;
                } else {
                    fifthChestLootedB = 0;
                }

                JSONFile = {
                    "Name": userName,
                    "Application": "Below",
                    "PlayTimeInSeconds": Date.now() - startTime + savedTime,
                    "lvl1SwordAcquired": lvl1SwordB,
                    "lvl2SwordAcquired": lvl2SwordB,
                    "lvl3SwordAcquired": lvl3SwordB,
                    "shieldAcquired": shieldB,
                    "armourAcquired": armourB,
                    "goblinIsD": goblinIsDeadB,
                    "alienIsD": alienIsDeadB,
                    "firstChestLooted": firstChestLootedB,
                    "secondChestLooted": secondChestLootedB,
                    "thirdChestLooted": thirdChestLootedB,
                    "forthChestLooted": forthChestLootedB,
                    "fifthChestLooted": fifthChestLootedB,
                    "currentPlayerHealth": currentHealth,
                    "maxHealth": maxPlayerHealth
                }

                localStorage.saveData = (JSON.stringify(JSONFile));


                /*saveData = JSON.parse(localStorage.saveData);*/

                console.log(localStorage.saveData);

                saveGame(JSON.stringify(JSONFile), "SavedGame.json");
                console.log(JSONFile.goblinIsD);

                rightClick = false;
                animationActive = true;
                window.requestAnimationFrame(drawScene);
            } else {
                rightClick = false;
                animationActive = true;
                window.requestAnimationFrame(drawScene);
            }
        }
        if (bottomClick) {
            try {
                loadedData = JSON.parse(localStorage.saveData);
                if (loadedData.Name == "") {
                    throw "No data";
                }
                alert("Save loaded");
                savedTime = loadedData.PlayTimeInSeconds;
                if (loadedData.lvl1SwordAcquired == 0) {
                    lvl1Sword = false;
                } else {
                    lvl1Sword = true;
                }
                if (loadedData.lvl2SwordAcquired == 0) {
                    lvl2Sword = false;
                } else {
                    lvl2Sword = true;
                }
                if (loadedData.lvl3SwordAcquired == 0) {
                    lvl3Sword = false;
                } else {
                    lvl3Sword = true;
                }
                if (loadedData.shieldAcquired == 0) {
                    shield = false;
                } else {
                    shield = true;
                }
                if (loadedData.armourAcquired == 0) {
                    armour = false;
                } else {
                    armour = true;
                }
                if (loadedData.goblinIsD == 0) {
                    goblinIsDead = false;
                } else {
                    goblinIsDead = true;
                }
                if (loadedData.alienIsD == 0) {
                    alienIsDead = false;
                } else {
                    alienIsDead = true;
                }
                if (loadedData.firstChestLooted == 0) {
                    firstChestLooted = false;
                } else {
                    firstChestLooted = true;
                }
                if (loadedData.secondChestLooted == 0) {
                    secondChestLooted = false;
                } else {
                    secondChestLooted = true;
                }
                if (loadedData.thirdChestLooted == 0) {
                    thirdChestLooted = false;
                } else {
                    thirdChestLooted = true;
                }
                if (loadedData.thirdChestLooted == 0) {
                    forthChestLooted = false;
                } else {
                    forthChestLooted = true;
                }
                if (loadedData.fifthChestLooted == 0) {
                    fifthChestLooted = false;
                } else {
                    fifthChestLooted = true;
                }
                currentHealth = loadedData.currentPlayerHealth;
                maxPlayerHealth = loadedData.maxHealth;
                startTime = Date.now();


                bottomClick = false;
            } catch (e) {
                alert("No data to load");
                bottomClick = false;
                
            }
        }
    }
    if (room == "1stTunnel") {
        leftText = "Enter dark tunnel";
        rightText = "Enter lit tunnel";
        bottomText = "Return to surface";
        flavourText = "";

        if (leftClick == true) {
            room = "darkTunnel"
            leftClick = false;
        }
        if (rightClick == true) {
            room = "litTunnel"
            rightClick = false;
        }
        if (bottomClick == true) {
            room = "surface";
            bottomClick = false;
        }
    }
    if (room == "litTunnel") {
        if (goblinIsDead == false) {
            leftText = "Fight";
            rightText = "Restore Health";
            bottomText = "Return"
            if (leftClick == true) {
                if (lvl1Sword == true) {
                    currentHealth = 1;
                    goblinIsDead = true;
                    leftClick = false;
                } else {
                    flavourText = "You died, and were returned to the surface";
                    room = "surface";
                    leftClick = false;
                }
            } 
            
            if (rightClick == true) {
                currentHealth = maxPlayerHealth;
                flavourText = "Health restored";
                rightClick = false;
            }
            if (bottomClick == true) {
                room = "1stTunnel";
                bottomClick = false;
            }
        }
        else {
            leftText = "Check Chest";
            rightText = "Restore Health";
            bottomText = "Return"

            if (leftClick == true) {
                if (firstChestLooted == false) {
                    shield = true;
                    maxPlayerHealth++;
                    firstChestLooted = true;
                    flavourText = "You found a shield, +1 maximum health"
                } else {
                    shield = true;
                    flavourText = "You've already opened this chest"
                }
                leftClick = false;


                
                
            }
            if (rightClick == true) {
                currentHealth = maxPlayerHealth;
                flavourText = "Health restored";
                rightClick = false;
            }
            if (bottomClick == true) {
                room = "1stTunnel";
                flavourText = "";
                bottomClick = false;
            }
        }
    }
    if (room == "darkTunnel") {
        if (alienIsDead == true) {
            leftText = "Enter next chamber";
            rightText = "Loot chest";
            bottomText = "Return";
            if (leftClick) {
                room = "chestRoom2";
                leftClick = false;
            }
        } else {
            leftText = "Attack";
            rightText = "Loot chest";
            bottomText = "Return";
            if (leftClick) {
                if (lvl1Sword && shield && currentHealth > 2) {
                    alienIsDead = true;
                    currentHealth = 1;
                    leftClick = false;
                } else {
                    flavourText = "You died, and were returned to the surface";
                    room = "surface";
                    leftClick = false;
                }

            }
        }
        
        if (rightClick) {
            if (secondChestLooted) {
                flavourText = "You've already looted this chest";
                rightClick = false;
            } else {
                flavourText = "You found a sword! You may now attack monsters";
                secondChestLooted = true;
                lvl1Sword = true;
                rightClick = false;
            }
        }
        if (bottomClick) {
            room = "1stTunnel";
            bottomClick = false;
        }
    }

    if (room == "chestRoom2") {
        if (thirdChestLooted == false) {
            leftText = "Loot chest";
            rightText = "Boss Room";
            bottomText = "Return"

            if (leftClick) {
                lvl2Sword = true;
                leftClick = false;
                flavourText = "You found a better sword, and now deal more damage!";
                thirdChestLooted = true;
            }
            
            if (rightClick) {
                flavourText = "You died, and were returned to the surface";
                room = "surface";
                leftClick = false;
            }

            if (bottomClick) {
                room = "darkTunnel";
                bottomClick = false;
            }

        } else {
            leftText = "Left Room";
            rightText = "Boss Room";
            bottomText = "Return";

            if (rightClick) {
                room = "bossRoom";
                rightClick = false;
                flavourText = "";
            }
            if (leftClick) {
                room = "chestRoom3";
                leftClick = false;
                flavourText = "";
            }
            if (bottomClick) {
                room = "darkTunnel";
                bottomClick = false;
                flavourText = "";
            }
        }
        
    }
    if (room == "chestRoom3") {
        leftText = "Loot Chest";
        rightText = "Loot Chest";
        bottomText = "Return";
        if (rightClick) {
            if (forthChestLooted) {
                flavourText = "You have already looted this chest";
                rightClick = false;
            } else {
                lvl3Sword = true;
                flavourText = "You found a legendary sword. You now deal maximum damage";
                rightClick = false;
                forthChestLooted = true;
            }
        }
        if (leftClick) {
            if (fifthChestLooted) {
                flavourText = "You have already looted this chest";
                leftClick = false;
            } else {
                armour = true;
                flavourText = "You found armour. You have maximum health";
                fifthChestLooted = true;
                maxPlayerHealth++;
                maxPlayerHealth++;
                leftClick = false;
            }
        }
        if (bottomClick) {
            room = "chestRoom2";
            flavourText = "";
            bottomClick = false;
        }
    }
    if (room == "bossRoom") {
        leftText = "Attack";
        rightText = "Attack";
        bottomText = "";
        if (rightClick || leftClick) {
            if (lvl3Sword && armour && shield && currentHealth == maxPlayerHealth) {
                finishTime = Date.now();
                completeTime = finishTime - startTime;
                flavourText = "You defeated the final boss! Your time was" + completeTime;
                room = "surface";
                leftClick = false;
                rightClick = false;
            } else {
                flavourText = "You died, and were returned to the surface";
                room = "surface";
                leftClick = false;
                rightClick = false;
            }
        }
        
    }
    if (animationActive) {
        window.requestAnimationFrame(drawScene);
    }
    

    
}


    function getMousePos(canvas, evt) {
        var rect = backgroundCanvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    backgroundCanvas.addEventListener("click", function (evt) {
        var mousePos = getMousePos(backgroundCanvas, evt);
        if (inventoryOpen) {
            if (mousePos.x < (backgroundCanvas.width / 10) * 9 - 5 && mousePos.x > (backgroundCanvas.width / 10) * 9 - 25) {
                if (mousePos.y > (backgroundCanvas.height / 10) + 5 && mousePos.y < (backgroundCanvas.height / 10) + 25) {
                    inventoryOpen = false;
                }
            }
        } else {
            if (mousePos.x < (backgroundCanvas.width / 10) && (mousePos.x > 0)) {
                if (mousePos.y > 0 && mousePos.y < (backgroundCanvas.height / 10)) {
                    inventoryOpen = true;
                }
            }
            if (mousePos.x > (backgroundCanvas.width / 10) && (mousePos.x < (backgroundCanvas.width / 10) + 2 * backgroundCanvas.width / 10)) {
                if (mousePos.y > (backgroundCanvas.height / 2) && (mousePos.y < (backgroundCanvas.height / 2) + backgroundCanvas.height / 10)) {
                    leftClick = true;
                }
            }
            if (mousePos.x > (backgroundCanvas.width / 10 * 7) && (mousePos.x < (backgroundCanvas.width / 10 * 7) + 2 * backgroundCanvas.width / 10)) {
                if (mousePos.y > (backgroundCanvas.height / 2) && (mousePos.y < (backgroundCanvas.height / 2) + backgroundCanvas.height / 10)) {
                    rightClick = true;
                }
            }
            if (mousePos.x > (backgroundCanvas.width / 10 * 4) && (mousePos.x < (backgroundCanvas.width / 10 * 4) + 2 * backgroundCanvas.width / 10)) {
                if (mousePos.y > (backgroundCanvas.height / 10 * 8) && (mousePos.y < (backgroundCanvas.height / 10 * 8) + backgroundCanvas.height / 10)) {
                    bottomClick = true;
                }
            }
        }
    })
window.onload = function () {
    startTime = Date.now();
        drawScene();
    }