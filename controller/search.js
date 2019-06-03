const Survey = require('../models/survey');

exports.search = async (req, res) => {
    let { query, status, page } = req.query;
    status = parseInt(status, 10);
    status = status && status >= -1 && status <= 2 ? status : 0;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: 1
    }

    try {
        // use regexp to match surveys with received search query
        const surveys = await Survey.find({
            question: {
                $regex: new RegExp(query, 'i')
            },
            state: status
        }, { 
            responses: 0, 
            createdBy: 0, 
            createdParent: 0,
            options: 0,
            state: 0,
            resultPolicy: 0
        })
        .skip((options.page - 1) * options.limit)
        .limit(options.limit);
        
        return {
            data: surveys,
            page: options.page,
            last: surveys.length < options.limit
        };

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}