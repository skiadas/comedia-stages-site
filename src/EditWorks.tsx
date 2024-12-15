import { Profile, Work } from "./types"
import { ProfileSelect } from "./components/ProfileSelect"
import { EditGeneral, EditOneProps } from "./components/EditGeneral"
import { saveWork } from "./services/db"
import { randomId } from "./services/utils"
import { LabeledInput } from "./components/labeledInput"
import { WorkSelect } from "./components/WorkSelect"

export function EditWorks() {
  return (
    <EditGeneral
      categoryName="Work"
      inputName="choose-work"
      selectOne={WorkSelect}
      editOne={EditOneWork}
      saveValue={saveWork}
      createNew={makeNewWork}
    />
  )
}

export function EditOneWork({
  value: work,
  update,
  children,
}: EditOneProps<Work>) {
  // work = work ?? makeNewWork()
  return (
    <form className="edit-work">
      <LabeledInput
        name="work-title"
        label="Title"
        value={work?.title}
        onChange={(title) => update({ title })}
      />
      <label htmlFor="work-description">Description</label>
      <textarea
        name="work-description"
        value={work?.description}
        onChange={(ev) => update({ description: ev.target.value })}
      />
      <label htmlFor="work-author">Author (if known)</label>
      <ProfileSelect
        inputName="work-author"
        value={work.author}
        onChange={(author: Profile | null) => {
          update({ author: author || undefined })
          // Should be saving author info here
        }}
      />
      {children}
    </form>
  )
}

function makeNewWork(): Work {
  return { id: randomId(), title: "", description: "", characters: [] }
}
