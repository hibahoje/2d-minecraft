const Game = {

    originalWorld: [
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "tree",  "tree",  "tree",  "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "tree",  "tree",  "tree",  "tree",  "tree",  "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "tree",  "tree",  "tree",  "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wood",  "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wood",  "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
        ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
        ["dirt", "dirt", "rock", "rock", "dirt", "dirt", "rock", "dirt", "dirt", "rock", "dirt", "dirt", "rock", "dirt", "dirt", "rock", "dirt", "dirt", "rock", "dirt"],
        ["dirt", "rock", "rock", "dirt", "dirt", "rock", "rock", "dirt", "rock", "dirt", "dirt", "rock", "rock", "dirt", "rock", "dirt", "rock", "rock", "dirt", "rock"],
        ["rock", "rock", "rock", "rock", "dirt", "rock", "rock", "rock", "dirt", "dirt", "rock", "rock", "rock", "dirt", "rock", "rock", "dirt", "rock", "rock", "dirt"],
        ["rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock"]
    ],


    world: [],

    selectedTool: null,

    inventory: [],

    selectedInventoryItem: null,


    init() {

        this.world = this.copyWorld(this.originalWorld);

        this.renderWorld();

        this.setupTools();

        this.setupButtons();

        this.renderInventory();

    },


    copyWorld(world) {

        return world.map(row => [...row]);

    },


    renderWorld() {

        const worldElement = document.getElementById("world");

        worldElement.innerHTML = "";


        for (let row = 0; row < this.world.length; row++) {

            for (let col = 0; col < this.world[row].length; col++) {

                const tileType = this.world[row][col];

                const tile = document.createElement("div");

                tile.classList.add("tile");

                tile.classList.add("tile-" + tileType);


                tile.addEventListener("click", () => {

                    this.clickTile(row, col);

                });


                worldElement.appendChild(tile);

            }

        }

    },


    selectTool(tool) {

        this.selectedTool = tool;

        this.selectedInventoryItem = null;


        document.querySelectorAll(".tool").forEach(button => {

            button.classList.remove("selected");

        });


        const selectedButton = document.querySelector(
            `[data-tool="${tool}"]`
        );

        selectedButton.classList.add("selected");

        this.renderInventory();

    },


    setupTools() {

        const tools = document.querySelectorAll(".tool");


        tools.forEach(button => {

            button.addEventListener("click", () => {

                const tool = button.dataset.tool;

                this.selectTool(tool);

            });

        });

    },


    clickTile(row, col) {

        const tileType = this.world[row][col];


        

        if (this.selectedInventoryItem !== null) {

            if (tileType === "empty") {

                const inventoryItem =
                    this.inventory[this.selectedInventoryItem];


                this.world[row][col] = inventoryItem;

                this.inventory.splice(this.selectedInventoryItem, 1);

                this.selectedInventoryItem = null;

                this.renderWorld();

                this.renderInventory();

            }

            return;
        }


       

        if (this.selectedTool === null) {

            return;

        }


        if (
            this.selectedTool === "axe" &&
            (tileType === "tree" || tileType === "wood")
        ) {

            this.removeTile(row, col);

        }

        else if (
            this.selectedTool === "pickaxe" &&
            tileType === "rock"
        ) {

            this.removeTile(row, col);

        }

        else if (
            this.selectedTool === "shovel" &&
            (tileType === "dirt" || tileType === "grass")
        ) {

            this.removeTile(row, col);

        }

    },


    removeTile(row, col) {

        const tileType = this.world[row][col];

        this.addToInventory(tileType);

        this.world[row][col] = "empty";

        this.renderWorld();

        this.renderInventory();

    },


    addToInventory(tileType) {

        this.inventory.push(tileType);

    },


    renderInventory() {

        const inventoryElement =
            document.getElementById("inventoryItems");

        inventoryElement.innerHTML = "";


        this.inventory.forEach((tileType, index) => {

            const item = document.createElement("div");

            item.classList.add("inventory-item");

            item.classList.add("tile-" + tileType);


            if (this.selectedInventoryItem === index) {

                item.classList.add("selected-inventory");

            }


            item.addEventListener("click", () => {

                this.selectedInventoryItem = index;

                this.selectedTool = null;


                document.querySelectorAll(".tool").forEach(button => {

                    button.classList.remove("selected");

                });


                this.renderInventory();

            });


            inventoryElement.appendChild(item);

        });

    },


    resetWorld() {

        this.world = this.copyWorld(this.originalWorld);

        this.inventory = [];

        this.selectedTool = null;

        this.selectedInventoryItem = null;


        document.querySelectorAll(".tool").forEach(button => {

            button.classList.remove("selected");

        });


        this.renderWorld();

        this.renderInventory();

    },


    setupButtons() {

        document
            .getElementById("resetBtn")
            .addEventListener("click", () => {

                this.resetWorld();

            });

    }

};


Game.init();