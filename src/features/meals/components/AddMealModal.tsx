import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InputMode = 'manual' | 'photo';

export const AddMealModal: React.FC<AddMealModalProps> = ({ isOpen, onClose }) => {
  const [inputMode, setInputMode] = useState<InputMode>('manual');

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            식사 등록
          </Dialog.Title>

          <div className="flex gap-4 mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-lg ${
                inputMode === 'manual'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setInputMode('manual')}
            >
              직접 입력
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg ${
                inputMode === 'photo'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setInputMode('photo')}
            >
              사진 첨부
            </button>
          </div>

          {inputMode === 'manual' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  음식 이름
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="예: 김치찌개"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  섭취량 (g)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="예: 300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  메모
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="추가 메모를 입력하세요"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="meal-photo"
                />
                <label
                  htmlFor="meal-photo"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">
                    클릭하여 사진 업로드
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  메모
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="추가 메모를 입력하세요"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg"
              onClick={() => {
                // TODO: 식사 등록 로직 구현
                onClose();
              }}
            >
              등록
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
