const { Users, Sequelize } = require("../models"); // Import Sequelize along with Users model

exports.getGenderCounts = async (req, res) => {
  try {
    const genderCounts = await Users.findAll({
      attributes: [
        "Gender",
        [Sequelize.fn("COUNT", Sequelize.col("Gender")), "count"],
      ],
      group: ["Gender"],
    });

    let maleCount = 0;
    let femaleCount = 0;

    genderCounts.forEach((entry) => {
      const gender = entry.dataValues.Gender;
      const count = entry.dataValues.count;

      if (gender === "Male") {
        maleCount = count;
      } else if (gender === "Female") {
        femaleCount = count;
      }
    });

    res.json({ maleCount, femaleCount });
  } catch (error) {
    console.error("Error fetching gender counts:", error);
    res.status(500).json({ error: "Failed to fetch gender counts" });
  }
};

// Controller function to get counts of each service provider
exports.getServiceProviderCounts = async (req, res) => {
  try {
    // Use Sequelize's aggregation functions to count users for each service provider
    const serviceProviderCounts = await Users.findAll({
      attributes: [
        "ServiceProvider",
        "Gender", // Include the 'Gender' attribute
        [Sequelize.fn("COUNT", Sequelize.col("ServiceProvider")), "count"],
      ],
      group: ["ServiceProvider", "Gender"], // Group by both ServiceProvider and Gender
    });

    // Initialize an object to store the counts by gender and service provider
    const countsByGender = {
      total: {},
      Male: {},
      Female: {},
    };

    // Initialize all service providers with a count of 0
    const serviceProviders = ["Mobitel", "Hutch", "Dialog", "Airtel"];
    serviceProviders.forEach((provider) => {
      countsByGender.total[provider] = 0;
      countsByGender.Male[provider] = 0;
      countsByGender.Female[provider] = 0;
    });

    // Transform the result to match the desired structure
    serviceProviderCounts.forEach((entry) => {
      const serviceProvider = entry.ServiceProvider;
      const gender = entry.Gender;
      const count = entry.get("count");

      // Add the count to the corresponding category
      countsByGender.total[serviceProvider] += count;
      countsByGender[gender][serviceProvider] = count;
    });

    res.json(countsByGender);
  } catch (error) {
    console.error("Error fetching service provider counts:", error);
    res.status(500).json({ error: "Failed to fetch service provider counts" });
  }
};

exports.getTotalUserCount = async (req, res) => {
  try {
    const totalCount = await Users.count(); // Use the count() method to get the total count of records
    res.json({ totalCount });
  } catch (error) {
    console.error("Error fetching total user count:", error);
    res.status(500).json({ error: "Failed to fetch total user count" });
  }
};


exports.getAgesAndGenders = async (req, res) => {
  try {
    // Define age ranges
    const ageRanges = [
      { min: 16, max: 25 },
      { min: 26, max: 35 },
      { min: 36, max: 45 },
      { min: 46, max: 55 },
      { min: 56, max: 65 },
      { min: 66, max: 75 },
      { min: 76, max: 85 },
      { min: 86, max: 95 },
      { min: 96, max: 100 },
    ];

    const genderAges = {};

    // Initialize the genderAges object with empty arrays for males and females
    genderAges.Male = Array(ageRanges.length).fill(0);
    genderAges.Female = Array(ageRanges.length).fill(0);

    const userAgesAndGenders = await Users.findAll({
      attributes: ["Gender", "DOB"], // Include the 'DateOfBirth' field
    });

    userAgesAndGenders.forEach((user) => {
      const gender = user.Gender;
      const dateOfBirth = user.DOB;

      // Calculate age based on 'DateOfBirth'
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      // Determine the age range for the calculated age
      for (let i = 0; i < ageRanges.length; i++) {
        const { min, max } = ageRanges[i];
        if (age >= min && age <= max) {
          // Increment the count for the corresponding age range and gender
          genderAges[gender][i]++;
          break; // Exit the loop once the age range is found
        }
      }
    });

    res.json(genderAges);
  } catch (error) {
    console.error("Error fetching ages and genders:", error);
    res.status(500).json({ error: "Failed to fetch ages and genders" });
  }
};


exports.getActiveUserCount = async (req, res) => {
  try {
    // Use Sequelize's count() method to count users where Status is 'Active'
    const activeUserCount = await Users.count({
      where: {
        Status: true,
      },
    });

    res.json({ activeUserCount });
  } catch (error) {
    console.error("Error fetching active user count:", error);
    res.status(500).json({ error: "Failed to fetch active user count" });
  }
};

exports.getHometownCounts = async (req, res) => {
  try {
    const users = await Users.findAll({ attributes: ['Address'] });

    // Create a map to store hometown counts
    const hometownCounts = new Map();

    users.forEach((user) => {
      const address = user.Address;

      // Split the address by ', ' or ','
      const addressParts = address.split(/, |,/);

      // Get the last part of the address as hometown and trim any leading or trailing spaces
      const hometown = addressParts[addressParts.length - 1].trim();

      // If the hometown is already in the map, increment the count; otherwise, initialize it to 1
      if (hometownCounts.has(hometown)) {
        hometownCounts.set(hometown, hometownCounts.get(hometown) + 1);
      } else {
        hometownCounts.set(hometown, 1);
      }
    });

    // Convert the map to a plain object
    const hometownCountsObject = {};
    hometownCounts.forEach((count, hometown) => {
      hometownCountsObject[hometown] = count;
    });

    res.json(hometownCountsObject);
  } catch (error) {
    console.error('Error fetching hometown counts:', error);
    res.status(500).json({ error: 'Failed to fetch hometown counts' });
  }
};

