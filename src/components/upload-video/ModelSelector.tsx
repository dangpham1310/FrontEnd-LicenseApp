import { FC, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

// Model type đã được định nghĩa ở ../../types.ts, 
// không cần định nghĩa lại ở đây nếu import { Model } from '../../types'; hoạt động đúng
// Giả định rằng ../../types đã có định nghĩa Model này
interface Model {
  id: string;
  name: string;
  description: string;
}

const models: Model[] = [
  {
    id: 'phuongtien',
    name: 'Phương tiện',
    description: 'Chọn các loại phương tiện để phân tích'
  },
  {
    id: 'tuychinh',
    name: 'Tuỳ chỉnh',
    description: 'Các tùy chọn nhận diện nâng cao'
  }
];

interface ModelSelectorProps {
  selectedModel: Model;
  onModelSelect: (model: Model) => void;
}

const ModelSelector: FC<ModelSelectorProps> = ({ selectedModel, onModelSelect }) => {
  return (
    <div className="w-full">
      <Listbox value={selectedModel} onChange={onModelSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-4 pr-10 text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75">
            <span className="block truncate font-medium">{selectedModel.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {models.map((model) => (
                <Listbox.Option
                  key={model.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-primary/5 text-primary' : 'text-gray-900'
                    }`
                  }
                  value={model}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex flex-col">
                        <span className={`truncate ${selected ? 'font-medium text-primary' : 'font-normal'}`}>
                          {model.name}
                        </span>
                        <span className={`truncate text-sm ${selected ? 'text-primary/70' : 'text-gray-500'}`}>
                          {model.description}
                        </span>
                      </div>
                      {selected && (
                        <span className="absolute inset-y-0 right-4 flex items-center text-primary">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ModelSelector; 