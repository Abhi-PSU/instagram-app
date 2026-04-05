module.exports = function handler(req, res) {
  res.status(200).json({
    "author": {
      "name": "Abhi Adusumilli",
      "image": "https://randomfox.ca/images/1.jpg",
      "userSince": "2024",
      "channel": "fox_gallery"
    },
    "images": [
      { "id": 1, "name": "Red Fox in the Snow", "description": "A red fox exploring a snowy landscape", "dateTaken": "2024-01-15", "thumbnail": "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400", "fullSize": "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200" },
      { "id": 2, "name": "Fox at Sunset", "description": "A fox sitting in a golden field at dusk", "dateTaken": "2024-02-03", "thumbnail": "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=400", "fullSize": "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=1200" },
      { "id": 3, "name": "Arctic Fox", "description": "A white arctic fox blending into the snow", "dateTaken": "2024-02-20", "thumbnail": "https://images.unsplash.com/photo-1520501258038-a2f9e0de4705?w=400", "fullSize": "https://images.unsplash.com/photo-1520501258038-a2f9e0de4705?w=1200" },
      { "id": 4, "name": "Fox Cub Playing", "description": "A young fox cub playing in the grass", "dateTaken": "2024-03-10", "thumbnail": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400", "fullSize": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200" },
      { "id": 5, "name": "Fox in the Forest", "description": "A fox peering through autumn leaves", "dateTaken": "2024-03-22", "thumbnail": "https://images.unsplash.com/photo-1462953491269-9aff00919695?w=400", "fullSize": "https://images.unsplash.com/photo-1462953491269-9aff00919695?w=1200" },
      { "id": 6, "name": "Sleeping Fox", "description": "A fox curled up asleep in the sun", "dateTaken": "2024-04-05", "thumbnail": "https://images.unsplash.com/photo-1529511582893-f34e8a207e9e?w=400", "fullSize": "https://images.unsplash.com/photo-1529511582893-f34e8a207e9e?w=1200" },
      { "id": 7, "name": "Fox on a Rock", "description": "A fox standing tall on a rocky hillside", "dateTaken": "2024-04-18", "thumbnail": "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=400", "fullSize": "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=1200" },
      { "id": 8, "name": "Fox Close Up", "description": "A detailed close up of a foxs face", "dateTaken": "2024-05-01", "thumbnail": "https://images.unsplash.com/photo-1507666664536-85e9c25f2bd0?w=400", "fullSize": "https://images.unsplash.com/photo-1507666664536-85e9c25f2bd0?w=1200" },
      { "id": 9, "name": "Fox in Wildflowers", "description": "A fox running through a field of wildflowers", "dateTaken": "2024-05-14", "thumbnail": "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=400", "fullSize": "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=1200" },
      { "id": 10, "name": "Night Fox", "description": "A fox spotted out at night under the stars", "dateTaken": "2024-06-02", "thumbnail": "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=400", "fullSize": "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=1200" },
      { "id": 11, "name": "Fox Family", "description": "A mother fox with her cubs outside their den", "dateTaken": "2024-06-15", "thumbnail": "https://images.unsplash.com/photo-1519606247872-b7979b2b09e8?w=400", "fullSize": "https://images.unsplash.com/photo-1519606247872-b7979b2b09e8?w=1200" },
      { "id": 12, "name": "Fox by the River", "description": "A fox drinking from a clear mountain stream", "dateTaken": "2024-07-04", "thumbnail": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400", "fullSize": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200" },
      { "id": 13, "name": "Fox in Autumn", "description": "A fox surrounded by fallen autumn leaves", "dateTaken": "2024-09-30", "thumbnail": "https://images.unsplash.com/photo-1446081364742-ab94d271a2e5?w=400", "fullSize": "https://images.unsplash.com/photo-1446081364742-ab94d271a2e5?w=1200" },
      { "id": 14, "name": "Jumping Fox", "description": "A fox mid leap over a log in the woods", "dateTaken": "2024-10-12", "thumbnail": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400", "fullSize": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200" },
      { "id": 15, "name": "Winter Fox", "description": "A fox hunting beneath a fresh layer of snow", "dateTaken": "2024-12-01", "thumbnail": "https://images.unsplash.com/photo-1455099975117-7e5a3f92bf95?w=400", "fullSize": "https://images.unsplash.com/photo-1455099975117-7e5a3f92bf95?w=1200" }
    ]
  });
};