import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';

type TSuggestInput = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  suggestions: {
    id: number
    nickname: string
  }[]
  name?: string
  onSuggestionsPick: (s: {
    id: number
    value: string
  }) => void
  onCloseSuggestions?: () => void
  disableSuggestions?: boolean
}

export const SuggestInput: React.FC<TSuggestInput> = ({
  value,
  onChange,
  name,
  suggestions,
  onSuggestionsPick,
  onCloseSuggestions,
  disableSuggestions,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (isActive && !wrapperRef.current?.contains(e.target as Node)) {
        setIsActive(false);
        if (onCloseSuggestions) onCloseSuggestions();
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={wrapperRef}>
      <FormControl
        onFocus={() => setIsActive(true)}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
      {(suggestions.length > 0 && isActive && !disableSuggestions) && (
        <div className="py-2">
          <ListGroup>
            {suggestions.map((s) => (
              <ListGroupItem
                key={s.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSuggestionsPick({
                    id: s.id,
                    value: s.nickname,
                  });
                }}
              >
                {s.nickname}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};
