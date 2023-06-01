import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Edit } from "lucide-react";
import { toast } from "react-hot-toast";

type Recipe = {
  id: number;
  name: string;
  img: string | null;
  desc: string | null;
  price: number;
  step: string[];
};

const UpdateRecipe = ({ recipes }: { recipes: Recipe }) => {
  const [name, setName] = useState(recipes.name);
  const [desc, setDesc] = useState(recipes.desc || "");
  const [price, setPrice] = useState(recipes.price);
  const [step, setStep] = useState(recipes.step);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/recipe/${recipes.id}`, {
      name: name,
      desc: desc,
      price: price,
      step: step,
    });
    toast.success(`${name} updated`);
    setIsLoading(false);
    router.refresh; // Use replace instead of refresh to avoid infinite reloading
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const addStep = () => {
    setStep([...step, ""]);
  };

  const removeStep = (index: number) => {
    const updatedStep = [...step];
    updatedStep.splice(index, 1);
    setStep(updatedStep);
  };

  const updateStep = (index: number, value: string) => {
    const updatedStep = [...step];
    updatedStep[index] = value;
    setStep(updatedStep);
  };

  return (
    <div>
      <button onClick={handleModal}>
        <Edit />
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleUpdate}>
            {/* Name */}
            <div className="form-control w-full">
              <label className="label font-bold">Update {name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Recipe name"
              />
            </div>
            {/* Desc */}
            <div className="form-control w-full">
              <label className="label font-bold">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="input input-bordered"
                placeholder="Description"
              />
            </div>
            {/* Price */}
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="number"
                value={price}
                step={0.01}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="input input-bordered"
              />
            </div>
            {/* Steps */}
            <div className="form-control w-full">
              <label className="label font-bold">Steps</label>
              {step.map((e, i) => (
                <div className="flex justify-between items-center mt-2" key={i}>
                  <input
                    type="text"
                    value={e}
                    onChange={(event) => updateStep(i, event.target.value)}
                    className="input input-bordered w-full"
                    placeholder={`Step ${i + 1}`}
                  />
                  <button
                    type="button"
                    className="btn btn-error ml-2"
                    onClick={() => removeStep(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={addStep}
              >
                Add Step
              </button>
            </div>
            {/* Actions */}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
