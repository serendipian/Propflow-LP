
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Button } from '../ui/UI';
import { blogPosts } from '../../data/blog';

export default function BlogSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative">
      <div className="max-w-[1100px] mx-auto px-6">
            
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <h2 className="text-3xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">Latest from our Blog</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Strategies, insights, and stories from the frontlines of modern real estate.
                </p>
            </div>
            <Button variant="outline" className="hidden md:flex group bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700">
                View All Articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
                <motion.article 
                    key={post.id}
                    className="group flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-xs font-bold text-zinc-900 dark:text-white rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm uppercase tracking-wide">
                                {post.category}
                            </span>
                        </div>
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            width="600"
                            height="400"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                        <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-medium">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={12} /> {post.date}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span className="flex items-center gap-1.5">
                                <Clock size={12} /> {post.readTime}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                        </h3>
                        
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3 flex-1 leading-relaxed">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-5 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
                            <div className="flex items-center gap-2">
                                <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-700" loading="lazy" width="24" height="24" />
                                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">{post.author.name}</span>
                            </div>
                            <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>

        <div className="mt-8 md:hidden">
            <Button variant="outline" className="w-full justify-center">View All Articles</Button>
        </div>

      </div>
    </section>
  );
}
