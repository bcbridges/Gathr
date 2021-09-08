const router = require('express').Router();
const { User, EventTags, Events } = require('../../models');

const withAuth = require('../../utils/auth');

//http:localhost:3001/api/event
router.get('/', async (req, res) => {
  // find all eventTags
  // let's include their events?
  try{
    const eventData = await Events.findAll({
      include: [{model: EventTags}, {model: User}]
    });
    const events = eventData.map((event) =>
      event.get({ plain: true })
    );
    res.render('eventsPage', {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  // find a single EventTag by its `id`
  // let's include their event
  try{
    const eventData = await Events.findByPk(req.params.id, {
      include: [{model: EventTags}, {model: User}]
    });
    const event = eventData.get({ plain: true });
    if (!event) {
      res.status(404).json({message: 'no eventTag found with that id!'})
      return;
    }

    res.render('singleEvent', { event, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Events.create({
    owner_id: req.body.owner_id,
    tag_id: req.body.tag_id,
    address_1: req.body.address_1,
    address_2: req.body.address_2,
    city: req.body.city,
    state: req.body.state,
    postal: req.body.postal,
    time_start: req.body.time_start,
    time_end: req.body.time_end,
    description: req.body.description,
    event_image: req.body.event_image

  })
  .then((newEvent) => {
    res.json(newEvent,)
  })
  .catch((err)=> {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Events.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updatedEvent) => {
    res.json(updatedEvent)
  })
  .catch((err) => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Events.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedEvent) => {
    res.json(deletedEvent);
  })
  .catch((err) => res.json(err))
});

module.exports = router;