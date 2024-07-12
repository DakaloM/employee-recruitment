import { builder } from "~/graphql/builder";


const CreateAdvertInput = builder.inputType('CreateAdvertInput', {
  fields: (t) => ({
    requisitionId: t.string({required: true}),
    positionTitle: t.string({required: true}),
    title: t.string({required: true}),
    location: t.string({required: true}),
  })
})