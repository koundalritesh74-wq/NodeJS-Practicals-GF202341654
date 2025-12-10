const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/mydatabase';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('User', userSchema);
async function main() {
    try {
        await mongoose.connect(dbURI);
        console.log('✅ Successfully connected to MongoDB!');

        // Create a new user instance
        const newUser = new User({
            name: 'Ravi Kumar',
            email: 'ravi.thakur32212@gmail.com',
            age: 30
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log('💾 User saved successfully:', savedUser);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB.');
    }
}

main();
