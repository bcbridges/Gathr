const router = require("express").Router();
const { Events, EventTags } = require("../../models");

//http:localhost:3001/api/eventTag
router.get("/", async (req, res) => {
  // find all eventTags
  // let's include their events?
  try {
    const eventTagData = await EventTags.findAll({
      include: [{ model: Events }],
    });

    const eventTags = eventTagData.map((event) => event.get({ plain: true }));
    res.status(200).json({ eventTags });
  } catch (err) {
    res.status(500).json(err);
  }
});

//http:localhost:3001/api/eventTag/1<--this is just an example!
router.get("/:id", async (req, res) => {
  // find a single EventTag by its `id`
  // let's include their event
  try {
    console.log("Beginning of /:id route.");
    console.log(req.params.id);
    const eventTagData = await EventTags.findAll({
      where: {
        tag_description: req.params.id,
      },
      include: [
        {
          model: Events,
          attributes: [
            "address_1",
            "address_2",
            "city",
            "state",
            "postal",
            "time_start",
            "event_title",
            "description",
          ],
        },
      ],
    });
    if (!eventTagData) {
      res.status(404).json({ message: "no eventTag found with that id!" });
      return;
    }
    const events = eventTagData.map((event) => event.get({ plain: true }));
    console.log(events[0]);
    res.render("search", { events });
    // res.status(200).json(eventTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http:localhost:3001/api/eventTag
router.post("/", (req, res) => {
  // create a new tag
  EventTags.create({
    tag_description: req.body.tag_description,
  })
    .then((newEventTag) => {
      res.json(newEventTag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//http:localhost:3001/api/eventTag/1<--just an example
router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  EventTags.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedEventTag) => {
      res.json(updatedEventTag);
    })
    .catch((err) => res.json(err));
});

//http:localhost:3001/api/eventTag/1<--just an example
router.delete("/:id", (req, res) => {
  // delete on EventTags by its `id` value
  EventTags.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedEventTag) => {
      res.json(deletedEventTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
