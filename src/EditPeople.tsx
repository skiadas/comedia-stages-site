import { Profile } from "./types"
import { savePerson } from "./services/db"
import { randomId } from "./services/utils"
import { EditGeneral, EditOneProps } from "./components/EditGeneral"
import { ProfileSelect } from "./components/ProfileSelect"
import { LabeledInput } from "./components/labeledInput"

export function EditPeople() {
  return (
    <EditGeneral
      categoryName="Person"
      inputName="choose-person"
      selectOne={ProfileSelect}
      editOne={EditPerson}
      saveValue={savePerson}
      createNew={makeNewProfile}
    />
  )
}

function EditPerson(props: EditOneProps<Profile>) {
  const { value, update, children } = props
  return (
    <form className="edit-person">
      <LabeledInput
        name="person-first"
        label="First name"
        value={value?.firstName}
        onChange={(firstName) => update({ firstName })}
      />
      <LabeledInput
        name="person-last"
        label="Last name"
        value={value?.lastName}
        onChange={(lastName) => update({ lastName })}
      />
      {children}
    </form>
  )
}

function makeNewProfile(): Profile {
  return {
    id: randomId(),
    firstName: "",
    lastName: "",
  }
}
