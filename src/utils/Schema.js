
const Schema = {

    Types: {
        Mixed: 'json',
        ObjectId: 'object-id',
        String: 'string',
        Timestamp: 'date',
        Date: 'date'
    },

    /**
     * Generate a Mongo compatible _id string
     */
    objectId () {
        
        function hex (value) {
            return Math.floor(value).toString(16)
        }
    
        return hex(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16))
    }

}


export default Schema