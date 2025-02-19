import { graphql } from '@/lib/query'
import RedirectLinkFragment from '../redirect-link'
import CheckboxFieldFragment from './fields/checkbox-field'
import RadioGroupFragment from './fields/radio-group'
import SelectFieldFragment from './fields/select-field'
import FormSepratorFragment from './fields/seprator'
import SubmitFieldFragment from './fields/submit-field'
import TextFieldFragment from './fields/text-field'

const FormFragment = graphql(
  /* GraphQL */ `
    fragment FormFragment on FormRecord @_unmask {
      _modelApiKey
      id
      title
      slug
      formspreeId
      successMessage
      errorMessage
      pendingMessage
      redirect
      redirectLink {
        ...RedirectLinkFragment
      }
      formBuilder {
        ...TextFieldFragment
        ...SelectFieldFragment
        ...SubmitFieldFragment
        ...CheckboxFieldFragment
        ...RadioGroupFragment
        ...FormSepratorFragment
      }
    }
  `,
  [
    TextFieldFragment,
    CheckboxFieldFragment,
    SelectFieldFragment,
    SubmitFieldFragment,
    RadioGroupFragment,
    FormSepratorFragment,
    RedirectLinkFragment
  ]
)

export default FormFragment
