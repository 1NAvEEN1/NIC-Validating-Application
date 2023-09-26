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
