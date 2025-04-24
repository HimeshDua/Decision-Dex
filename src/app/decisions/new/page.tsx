'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';

export default function NewDecisionPage() {
    const [title, setTitle] = useState('');
    const [userDecision, setUserDecision] = useState('');
    const [options, setOptions] = useState([
        {
            id: 1,
            title: '',
            pros: [''],
            cons: ['']
        }
    ]);

    const handleAddOption = () => {
        setOptions([
            ...options,
            {
                id: Date.now(), // Use a more reliable unique ID
                title: '',
                pros: [''],
                cons: ['']
            }
        ]);
    };

    const handleRemoveOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleChangeOption = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    const handleChangeList = (optionIndex, type, listIndex, value) => {
        const newOptions = [...options];
        newOptions[optionIndex][type][listIndex] = value;
        setOptions(newOptions);
    };

    const handleAddListItem = (optionIndex, type) => {
        const newOptions = [...options];
        newOptions[optionIndex][type].push('');
        setOptions(newOptions);
    };

    const handleRemoveListItem = (optionIndex, type, listIndex) => {
        const newOptions = [...options];
        newOptions[optionIndex][type] = newOptions[optionIndex][type].filter(
            (_, i) => i !== listIndex
        );
        setOptions(newOptions);
    };

    const handleSubmit = () => {
        // Implement your submit logic here
        console.log({ title, userDecision, options });
        alert('Decision submitted (check console for data)');
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">
                Create a New Decision
            </h1>
            <Card className="bg-card shadow-lg border border-border rounded-xl p-6">
                <div>
                    <Label
                        htmlFor="title"
                        className="block text-sm font-medium text-muted-foreground"
                    >
                        Title
                    </Label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Should I switch careers?"
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-ring focus:border-ring border-input bg-background text-foreground rounded-md"
                    />
                </div>
                <div>
                    <Label
                        htmlFor="userDecision"
                        className="block text-sm font-medium text-muted-foreground"
                    >
                        Your Initial Thoughts
                    </Label>
                    <Textarea
                        id="userDecision"
                        value={userDecision}
                        onChange={(e) => setUserDecision(e.target.value)}
                        placeholder="What are you leaning towards?"
                        rows={3}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-ring focus:border-ring border-input bg-background text-foreground rounded-md"
                    />
                </div>

                <div className="space-y-6">
                    {options.map((option, idx) => (
                        <Card key={option.id} className="p-6 bg-card border-border">
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor={`option-title-${option.id}`}
                                        className="block text-xl font-semibold mb-2 text-foreground"
                                    >
                                        Option {idx + 1}
                                    </Label>
                                    {options.length > 1 && (
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleRemoveOption(idx)}
                                            className="focus:outline-none"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <Input
                                    id={`option-title-${option.id}`}
                                    type="text"
                                    value={option.title}
                                    onChange={(e) =>
                                        handleChangeOption(idx, 'title', e.target.value)
                                    }
                                    placeholder={`Title of option ${idx + 1}`}
                                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-ring focus:border-ring border-input bg-background text-foreground rounded-md"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="block text-sm font-medium text-muted-foreground">
                                            Pros
                                        </Label>
                                        <div className="space-y-2">
                                            {option.pros.map((pro, proIdx) => (
                                                <div
                                                    key={`pro-${option.id}-${proIdx}`}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Input
                                                        type="text"
                                                        value={pro}
                                                        onChange={(e) =>
                                                            handleChangeList(
                                                                idx,
                                                                'pros',
                                                                proIdx,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={`Pro ${proIdx + 1}`}
                                                        className="w-full shadow-sm sm:text-sm focus:ring-ring focus:border-ring border-input bg-background text-foreground rounded-md"
                                                    />
                                                    {option.pros.length > 1 && (
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                handleRemoveListItem(idx, 'pros', proIdx)
                                                            }
                                                            className="focus:outline-none"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleAddListItem(idx, 'pros')}
                                                className="w-full justify-start"
                                            >
                                                <PlusIcon className="h-4 w-4 mr-2" /> Add Pro
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="block text-sm font-medium text-muted-foreground">
                                            Cons
                                        </Label>
                                        <div className="space-y-2">
                                            {option.cons.map((con, conIdx) => (
                                                <div
                                                    key={`con-${option.id}-${conIdx}`}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Input
                                                        type="text"
                                                        value={con}
                                                        onChange={(e) =>
                                                            handleChangeList(
                                                                idx,
                                                                'cons',
                                                                conIdx,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={`Con ${conIdx + 1}`}
                                                        className="w-full shadow-sm sm:text-sm focus:ring-ring focus:border-ring border-input bg-background text-foreground rounded-md"
                                                    />
                                                    {option.cons.length > 1 && (
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                handleRemoveListItem(idx, 'cons', conIdx)
                                                            }
                                                            className="focus:outline-none"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleAddListItem(idx, 'cons')}
                                                className="w-full justify-start"
                                            >
                                                <PlusIcon className="h-4 w-4 mr-2" /> Add Con
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-6 flex space-x-4">
                    <Button
                        variant="outline"
                        onClick={handleAddOption}
                        className="flex items-center"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" /> Add Option
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Submit Decision
                    </Button>
                </div>
            </Card>
        </div>
    );
}
