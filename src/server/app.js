import express from "express";
import cors from "cors";
import * as sql from "../server/models/posts.dao.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) =>
  sql
    .findPosts()
    .then((result) =>
      res.status(200).json({ status: true, code: 280, message: result })
    )
    .catch((error) =>
      res.status(580).json({ status: false, code: 580, message: error })
    )
);

app.get("/posts/:id", (req, res) =>
  sql
    .findByIdPosts(req.params.id)
    .then((result) =>
      res.status(200).json({ status: true, code: 280, message: result })
    )
    .catch((error) =>
      res.status(580).json({ status: false, code: 588, message: error })
    )
);

app.post("/posts", (req, res) =>
  sql
    .createPosts(req.body.titulo, req.body.img, req.body.descripcion)
    .then((result) =>
      res.status(201).json({ status: true, code: 281, message: result })
    )
    .catch((error) =>
      res.status(588).json({ status: false, code: 588, message: error })
    )
);

app.put("/posts/like/:id", (req, res) =>
  sql
    .likePost(req.params.id)
    .then((result) =>
      res.status(200).json({ status: true, code: 281, message: result })
    )
    .catch((error) =>
      res.status(588).json({ status: false, code: 588, message: error })
    )
);

app.delete("/posts/:id", (req, res) =>
  sql
    .deletePost(req.params.id)
    .then((result) =>
      res.status(200).json({ status: true, code: 281, message: result })
    )
    .catch((error) =>
      res.status(588).json({ status: false, code: 588, message: error })
    )
);

app.all("*", (req, res) =>
  res.status(484).json({ status: false, code: 484, message: "Page not found." })
);

app.listen(PORT, () => console.log("Server UP!"));

export default app;