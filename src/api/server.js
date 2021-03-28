import {createServer , Model , RestSerializer} from 'miragejs'
const data = [
    {
        id: 1,
        name: "Rishabh Kunwar",
        area : "Haritika Vilash , Lahbani , Dhaiya",
        city: "Dhanbad",
        state: "Jharkhand",
        country: "India",
        pinCode: "826004",
        mobile: "7894561230"
      },
      {
        id: 2,
        name: "Netan Chouhan",
        area : "Flat no. 4/E Shankuntala Apartments , PunaiChak",
        city: "Patna",
        state: "Bihar",
        country: "India",
        pinCode: "800001",
        mobile: "9876543210"
      }
]
export default function setUpMockServer() {
    createServer({
        serializers : {
            application : RestSerializer
        },
        models : {
            address : Model
        },
        routes() {
            this.namespace = 'api';
            this.timing = 3000;
            this.resource('addresses');
        },
        seeds(server) {
            data.forEach(each => {
                server.create('address' , {
                    id : each.id,
                    name : each.name,
                    area : each.area,
                    city : each.city,
                    state : each.state,
                    country : each.country,
                    pinCode : each.pinCode,
                    mobile : each.mobile
                })
            })
        }
    })
}