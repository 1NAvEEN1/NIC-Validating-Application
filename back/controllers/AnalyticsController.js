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


