const { Users, Sequelize } = require('../models'); // Import Sequelize along with Users model

exports.getGenderCounts = async (req, res) => {
  try {
    const genderCounts = await Users.findAll({
      attributes: [
        'Gender',
        [Sequelize.fn('COUNT', Sequelize.col('Gender')), 'count'],
      ],
      group: ['Gender'],
    });

    let maleCount = 0;
    let femaleCount = 0;

    genderCounts.forEach((entry) => {
      const gender = entry.dataValues.Gender;
      const count = entry.dataValues.count;

      if (gender === 'Male') {
        maleCount = count;
      } else if (gender === 'Female') {
        femaleCount = count;
      }
    });

    res.json({ maleCount, femaleCount });
  } catch (error) {
    console.error('Error fetching gender counts:', error);
    res.status(500).json({ error: 'Failed to fetch gender counts' });
  }
};

// Controller function to get counts of each service provider
exports.getServiceProviderCounts = async (req, res) => {
  try {
    // Use Sequelize's aggregation functions to count users for each service provider
    const serviceProviderCounts = await Users.findAll({
      attributes: [
        'ServiceProvider',
        [Sequelize.fn('COUNT', Sequelize.col('ServiceProvider')), 'count'],
      ],
      group: ['ServiceProvider'],
    });

    // Transform the result to a more structured format
    const countsByServiceProvider = {};
    serviceProviderCounts.forEach((entry) => {
      countsByServiceProvider[entry.ServiceProvider] = entry.get('count');
    });

    res.json(countsByServiceProvider);
  } catch (error) {
    console.error('Error fetching service provider counts:', error);
    res.status(500).json({ error: 'Failed to fetch service provider counts' });
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


// Controller function to get ages and genders of users
exports.getAgesAndGenders = async (req, res) => {
  try {
    const userAgesAndGenders = await Users.findAll({
      attributes: ['Gender', 'DOB'], // Include the 'DateOfBirth' field
    });

    const ages = [];
    const genders = [];

    userAgesAndGenders.forEach((user) => {
      const gender = user.Gender;
      const dateOfBirth = user.DOB;

      // Calculate age based on 'DateOfBirth'
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      // Push age and gender into their respective arrays
      ages.push(age);
      genders.push(gender);
    });

    res.json({ ages, genders });
  } catch (error) {
    console.error('Error fetching ages and genders:', error);
    res.status(500).json({ error: 'Failed to fetch ages and genders' });
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
    console.error('Error fetching active user count:', error);
    res.status(500).json({ error: 'Failed to fetch active user count' });
  }
};
