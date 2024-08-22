import { createConnection } from "./DatabaseHelper";
import {BaseModelHelper} from "./utils/BaseModelHelper";
import {Logger} from "./utils/Logger";
import Chance from "chance";
const chance = new Chance();

Logger.setLevel("debug");


describe("Model:Redis:BaseModelHelper", () => {

    beforeAll(async () => {

        // Timeout to wait for redis connection
        await createConnection({url:"redis://localhost/0"});
    });

    //afterAll(async () => {
    //})

    test("generateToken()", async () => {
        const n = chance.d100();
        const test = BaseModelHelper.generateToken(n);
        expect(test.length).toEqual(n);
        return;
    });

    test("getKey(null)", async () => {
        const name = chance.word();
        const type = chance.word();
        const key = BaseModelHelper.getKey(name, type);
        expect(key).toEqual(`${BaseModelHelper.prefix}:{${name}:${type}}`);
        return;
    });    
    
    test("getKey(id)", async () => {
        const name = chance.word();
        const type = chance.word();
        const id = chance.guid();
        const key = BaseModelHelper.getKey(name, type, id);
        expect(key).toEqual(`${BaseModelHelper.prefix}:{${name}:${type}:${id}}`);
        return;
    });    

    test("isNumericType()", async () => {        
        expect(BaseModelHelper.isNumericType("integer")).toEqual(true);
        expect(BaseModelHelper.isNumericType("number")).toEqual(true);
        expect(BaseModelHelper.isNumericType("float")).toEqual(true);
        expect(BaseModelHelper.isNumericType("timestamp")).toEqual(true);
        expect(BaseModelHelper.isNumericType("date")).toEqual(true);
        expect(BaseModelHelper.isNumericType("string")).toEqual(false);
        expect(BaseModelHelper.isNumericType("array")).toEqual(false);
        expect(BaseModelHelper.isNumericType("json")).toEqual(false);
        expect(BaseModelHelper.isNumericType("object")).toEqual(false);
        expect(BaseModelHelper.isNumericType(chance.word())).toEqual(false);
        return;
    });  

    test("parseBoolen()", async () => {        
        expect(BaseModelHelper.parseBoolen(null)).toEqual(false);
        expect(BaseModelHelper.parseBoolen(1)).toEqual(true);
        expect(BaseModelHelper.parseBoolen("1")).toEqual(true);
        expect(BaseModelHelper.parseBoolen(0)).toEqual(false);
        expect(BaseModelHelper.parseBoolen(-1)).toEqual(false);
        return;
    });    

    test("parseItem()", async () => {        

        expect(BaseModelHelper.parseItem({type:"integer"}, "0")).toEqual(0);

        expect(BaseModelHelper.parseItem({type:"array"}, "[1, 2, 3, 4]")).toEqual([1,2,3,4]);
        expect(BaseModelHelper.parseItem({type:"object"}, "{\"a\":35,\"b\":\"tests\"}")).toEqual({a:35,b:"tests"});

        // Tricky cases
        expect(BaseModelHelper.parseItem({type:"array"}, " ")).toEqual(null);
        expect(BaseModelHelper.parseItem({type:"integer"}, null)).toEqual(null);
        expect(BaseModelHelper.parseItem({type:"integer"}, undefined)).toEqual(null);

        return;
    });  

    test("writeItem()", async () => {        

        expect(BaseModelHelper.writeItem({type:"integer"}, 0)).toEqual(0);

        expect(BaseModelHelper.writeItem({type:"array"}, [1, 2, 3, 4])).toEqual("[1,2,3,4]");
        expect(BaseModelHelper.writeItem({type:"object"}, {a:35,b:"tests"})).toEqual("{\"a\":35,\"b\":\"tests\"}");

        // Tricky cases
        //expect(BaseModelHelper.writeItem({type:'array'}, " ")).toEqual(null)
        expect(BaseModelHelper.writeItem({type:"integer"}, null)).toEqual("");
        expect(BaseModelHelper.writeItem({type:"integer"}, undefined)).toEqual("");

        return;
    });        
});
