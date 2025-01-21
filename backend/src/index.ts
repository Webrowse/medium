import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post('/', (c) => c.text('POST /'))
app.post('/', (c) => c.text('POST /'))
app.post('/', (c) => c.text('POST /'))
app.put('/', (c) => c.text('PUT /'))


export default app
