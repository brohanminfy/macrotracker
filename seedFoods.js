import mongoose from 'mongoose'
import Food from './models/Food.js'
import dotenv from 'dotenv'

dotenv.config()

const foods = [
  {
    name: 'Chicken Breast',
    weight: 100,
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    isVeg: false
  },
  {
    name: 'Brown Rice',
    weight: 100,
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5,
    isVeg: true
  },
  {
    name: 'Broccoli',
    weight: 100,
    calories: 25,
    protein: 3,
    carbs: 5,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.5,
    sodium: 33,
    isVeg: true
  },
  {
    name: 'Salmon',
    weight: 100,
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0,
    sodium: 59,
    isVeg: false
  },
  {
    name: 'Banana',
    weight: 100,
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12,
    sodium: 1,
    isVeg: true
  },
  {
    name: 'Eggs',
    weight: 100,
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    sugar: 1.1,
    sodium: 124,
    isVeg: false
  },
  {
    name: 'Oats',
    weight: 100,
    calories: 389,
    protein: 17,
    carbs: 66,
    fat: 7,
    fiber: 11,
    sugar: 0.8,
    sodium: 2,
    isVeg: true
  },
  {
    name: 'Greek Yogurt',
    weight: 100,
    calories: 97,
    protein: 10,
    carbs: 3.6,
    fat: 5,
    fiber: 0,
    sugar: 3.6,
    sodium: 36,
    isVeg: true
  },
  {
    name: 'Almonds',
    weight: 100,
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12,
    sugar: 4.4,
    sodium: 1,
    isVeg: true
  },
  {
    name: 'Sweet Potato',
    weight: 100,
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    fiber: 3,
    sugar: 4.2,
    sodium: 54,
    isVeg: true
  }
]

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.DB)
  
    
    await Food.insertMany(foods)
    console.log('Seeded foods successfully')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding foods:', error)
    process.exit(1)
  }
}

seedFoods()