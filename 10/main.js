
    class Transport {
      constructor(color, material, manufacturer, maxSpeed) {
        this.color = color;
        this.material = material;
        this.manufacturer = manufacturer;
        this.maxSpeed = maxSpeed;
      }

      startEngine() {
        console.log('Engine starting...');
      }

      // Вывести все поля
      showCharacteristics() {
        for (var prop in this) {
          if (Object.prototype.hasOwnProperty.call(this, prop)) {
            console.log(`${prop}: ${this[prop]}`);
          }
        }
      }
    }

    // 1) Класс Boat - не наследуется ни от кого
    console.log('🚤 Лодка');
    class Boat {
      constructor(color, material, maxSpeed) {
        this.color = color;
        this.material = material;
        this.maxSpeed = maxSpeed;
      }

      sail() {
        console.log('Плывём по волнам!');
      }
      
      // Добавляем метод showCharacteristics для Boat
      showCharacteristics() {
        console.log(`color: ${this.color}`);
        console.log(`material: ${this.material}`);
        console.log(`maxSpeed: ${this.maxSpeed}`);
      }
    }

    const boat = new Boat('синий', 'пластик', 50);
    boat.sail();
    boat.showCharacteristics(); 

    console.log('///');

    // 2) Класс Bus - наследуется от Transport
    console.log('🚌 Автобус');
    class Bus extends Transport {
      constructor(color, material, manufacturer, maxSpeed, passengerCount) {
        super(color, material, manufacturer, maxSpeed);
        this.passengerCount = passengerCount;
      }

      drive() {
        console.log(`Едем по маршруту с ${this.passengerCount} пассажирами`);
      }
    }

    const bus = new Bus('желтый', 'металл', 'ЛиАЗ', 90, 40);
    bus.showCharacteristics();
    bus.drive();

    console.log('///');

    // 3) Класс Plane с переопределенным методом startEngine()
    console.log('✈️ Самолет');
    class Plane extends Transport {
      constructor(color, material, manufacturer, maxSpeed, maxHeight) {
        super(color, material, manufacturer, maxSpeed);
        this.maxHeight = maxHeight;
      }

      startEngine() {
        console.log('Турбины запускаются...');
      }

      fly() {
        console.log('Flying...');
      }
    }

    const plane = new Plane('white', 'aluminum', 'Boeing', 900, 10000);
    plane.startEngine();
    plane.fly();
    plane.showCharacteristics();
