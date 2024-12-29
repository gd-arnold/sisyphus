const HabitLogController = {
    post: async (req, res) => {
        try {
            return res.status(201).send();
        } catch (e) {
            return res.status(500).send();
        }
    },
    delete: async (req, res) => {
        try {
            return res.status(204).send();
        } catch (e) {
            return res.status(500).send();
        }
    }
};

export default HabitLogController;
